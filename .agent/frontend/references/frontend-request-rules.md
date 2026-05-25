# Frontend Request Rules

## 目标

本文件用于约束前端项目中的接口请求组织方式，目标是：

1. 保证接口调用入口统一、可维护、可审查
2. 降低页面层散落请求、重复拼装参数、错误处理不一致的问题
3. 让请求层、接口层、页面层职责清晰，便于多人协作和 AI 稳定落地

## 适用范围

适用于：

- `src/api/**` 下的接口函数
- 页面、组件、模型对接口函数的调用方式
- 请求参数组织、响应类型定义、错误处理边界、地址管理约束

不适用于：

- 后端接口设计本身
- 页面交互规范
- 全局状态建模规范
- 脱离项目请求层的独立 SDK 设计

## 基本原则

1. 所有业务接口统一收敛到 `src/api`
2. 页面不得直接调用 `fetch`、`axios` 或底层 `request`
3. 接口函数命名应表达业务语义，而不是只表达 HTTP 动作
4. 请求参数和响应结果应有清晰 TypeScript 类型
5. 通用错误处理交给全局请求层，页面只补充业务语义
6. 不允许硬编码完整后端地址

## 分层职责

### 页面层

负责：

- 触发请求
- 管理 loading
- 展示数据
- 给用户业务反馈

不负责：

- 手写请求地址
- 拼鉴权头
- 自己实现通用错误拦截
- 直接调用 `fetch`、`axios`、`request`

### `src/api` 接口层

负责：

- 定义接口函数
- 组织 URL、HTTP method、`params`、`data`
- 暴露给页面可直接使用的业务语义函数

不负责：

- 页面级 loading
- 页面级提示文案
- 页面状态管理

### 全局请求层

负责：

- 统一请求实例
- 请求与响应拦截器
- 鉴权头、超时、通用错误处理

默认对应 `src/request.tsx`。页面和普通业务组件不应绕过这一层另起一套请求体系。

## 文件放置规则

### 所有业务接口放在 `src/api`

推荐按业务域拆分：

```text
src/api/
  user.ts
  order.ts
  riskManage.ts
```

原则：

- 同一业务域接口放在同一模块
- 文件名表达业务模块，而不是技术动作
- 不把页面私有请求直接写在页面文件里

### 不把业务接口堆到全局请求层

- `src/request.tsx` 只负责全局请求配置
- 具体业务接口函数必须回到 `src/api/*`

### 页面不得直接请求

禁止新增以下写法：

- `fetch('/xxx')`
- `axios.get('/xxx')`
- `request('/xxx')`
- 直接拼接完整 URL

若确有特殊场景，必须在设计说明中写明原因与边界。

## 命名规范

推荐：

- `queryUserList`
- `getUserDetail`
- `createOrder`
- `updateRiskPermission`
- `deleteBackgroundPicture`

不推荐：

- `postUser`
- `requestList`
- `fetchData`
- `api1`

命名建议：

- 查询列表：`queryXxxList` / `getXxxPage`
- 查询详情：`getXxxDetail`
- 新增：`createXxx` / `addXxx`
- 更新：`updateXxx` / `editXxx`
- 删除：`deleteXxx`
- 字典 / 选项：`getXxxOptions` / `getXxxDict`

如果项目已有稳定命名体系，应保持一致，不混用多套风格。

## 参数组织规范

### `params` 与 `data` 分离

- URL query 使用 `params`
- 请求体使用 `data`
- 路径参数通过模板字符串或路径拼接表达

示例：

```ts
request('/user/page', {
  method: 'POST',
  params: { current: 1, size: 10 },
  data: { keyword: 'tom' },
});
```

### 不手写长 query 字符串

不推荐：

```ts
request(`/user/page?name=${name}&pageNo=${pageNo}&pageSize=${pageSize}`)
```

推荐：

```ts
request('/user/page', {
  method: 'GET',
  params: {
    name,
    pageNo,
    pageSize,
  },
})
```

### 入参先归一

页面或调用方传参前，优先完成：

- `trim`
- 空字符串转 `undefined` 或约定默认值
- 日期格式化
- 数值与布尔值归一

接口层不负责承接明显脏乱的页面输入。

## 类型规范

默认应补以下类型：

- 请求参数类型
- 请求体类型
- 响应结果类型
- 列表项类型
- 详情对象类型

示例：

```ts
export interface QueryUserListParams {
  keyword?: string;
  pageNo: number;
  pageSize: number;
}

export interface UserListItem {
  id: string;
  name: string;
  status: string;
}

export async function queryUserList(params: QueryUserListParams) {
  return request<PageResult<UserListItem>>('/api/users', {
    method: 'GET',
    params,
  });
}
```

类型放置原则：

- 当前 API 模块专用类型优先放本文件或同目录
- 跨模块共享类型再放 `src/types`
- 不要为了单个接口提前新建全局类型层

新代码不建议用 `any` 掩盖接口契约不清；如果契约不明且影响正确性，应先补信息。

## 错误处理规范

### 通用错误交给全局请求层

例如：

- 鉴权失效
- 通用错误提示
- 超时
- 通用重定向

### 页面只补充业务语义

页面层处理的应是：

- “列表加载失败，请稍后重试”
- “保存失败，请检查必填项”
- “导出失败，请稍后再试”

不要在每个页面里复制一套通用错误判断逻辑。

### 接口层不要吞错

不推荐：

```ts
export async function queryUserList(params) {
  try {
    return await request('/user/page', { method: 'GET', params });
  } catch (error) {
    return [];
  }
}
```

除非业务明确要求降级返回，否则接口层应让错误继续抛出。

## 地址管理规范

### 不硬编码完整后端地址

禁止新增：

- `https://xxx.xxx.com/api/user/list`
- `http://10.x.x.x:8080/api/user/list`

推荐：

- 使用相对路径，如 `/admin/user/query/simplelist`
- 由统一请求层注入前缀、域名和鉴权配置

历史特例不代表新代码推荐写法。

## 页面调用规范

推荐：

```ts
const response = await queryUserList(params);
```

不推荐：

```ts
const response = await request('/user/page', {
  method: 'GET',
  params,
});
```

页面应只关心：

- 什么时候请求
- 请求成功后如何更新状态
- 请求失败后如何反馈用户

页面不应关心：

- URL 拼接
- 鉴权头注入
- 通用错误拦截
- 会话校验细节

## 推荐检查清单

1. 接口是否已放入 `src/api`
2. 页面是否仍存在直接 `fetch`、`axios`、`request`
3. 接口函数名是否表达业务语义
4. 是否优先使用 `params`、`data`
5. 是否补充了必要的 TypeScript 类型
6. 是否复用了统一请求层
7. 是否避免了完整后端地址硬编码

## 一句话原则

页面只管用接口，业务接口统一收口到 `src/api`，请求细节交给全局请求层，命名、参数、类型与错误处理都保持统一。