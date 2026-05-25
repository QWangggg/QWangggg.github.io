---
name: AI Coding Skill Workflow Platform
last_updated: 2026-05-25
---

# AI Coding Skill Workflow Platform Strategy

## Target problem

在不同 AI Coding 场景下，我需要使用不同 Skill，但这些 Skill 如果没有系统整理，就很难快速理解它们的用途、触发条件和使用方式。现在最痛的是，每次修改或复用 Skill，都要回到对应项目、文档、聊天记录或仓库里查找，路径分散、检索困难，也不方便随时记录和维护。

## Our approach

产品原则是：Skill 卡片化，场景优先检索。

平台不以“收藏更多 Skill”为目标，而是先把 Skill 标准化成统一卡片，并围绕真实 AI Coding 场景建立检索入口。用户不需要记住 Skill 名称，只需要根据当前任务、问题或关键词，就能快速找到适合的 Skill，并看到它的使用方式、输入要求、输出结果和历史使用记录。

## Who it's for

**Primary:** AI Coding 程序员（第一阶段先以我自己为主）

他们会在启动开发任务、排查问题、生成代码、做代码审查或沉淀经验时打开这个平台，雇它帮自己快速找到当前场景应该调用的 Skill，并把分散的 Skill 变成可检索、可理解、可复用的工作流入口。

## Key metrics

- **找到合适 Skill 的时间** - 从输入开发场景到打开目标 Skill，第一阶段目标是控制在 30 秒以内；通过任务过程观察或手动记录衡量
- **场景命中率** - 搜索结果前 3 个 Skill 中，是否能出现符合当前任务的 Skill；通过搜索结果与使用反馈衡量
- **Skill 复用次数** - 同一个 Skill 是否能在多个 AI Coding 任务中被重复使用；通过使用记录统计
- **新增 Skill 再使用率** - 新沉淀的 Skill 是否能在后续任务中再次被调用；通过 Skill 历史调用记录衡量
- **沉淀记录覆盖率** - Skill 的使用、修改和验证过程是否有简短记录可追溯；通过 Skill 卡片附带记录统计

## Tracks

### Skill 结构标准化

把分散的 Skill 统一整理成结构一致的 Skill 卡片，形成稳定的信息骨架。

_Why it serves the approach:_ 没有统一结构，就无法支撑后续按场景检索、比较和复用。

### 场景检索与分类

围绕真实 AI Coding 场景建立搜索和分类入口，让用户能从任务出发找到 Skill，而不是从 Skill 名称倒推。

_Why it serves the approach:_ 这直接对应“场景优先检索”的产品原则，是平台区别于普通收藏库的核心。

### 使用与沉淀记录

记录 Skill 的使用、修改和验证过程，让每个 Skill 持续演化为可追溯、可复用的工作流资产。

_Why it serves the approach:_ 只有把使用过程沉淀下来，Skill 才不会停留在静态文档，而会变成真正可持续积累的资产。

## Non-goals

第一阶段不做通用知识库、不做团队协作平台、不做复杂权限系统，也不追求收集尽可能多的 Skill。

平台优先解决个人 AI Coding 场景下的 Skill 查找、理解、复用和沉淀问题。

## Future direction

当 Skill 卡片、场景检索和沉淀记录稳定后，再考虑让 AI Agent 能够直接读取 Skill 元数据，并在任务执行前自动推荐或调用合适的 Skill。
