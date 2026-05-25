import type { Skill, SkillScenario } from './types';

export const SKILL_SCENARIOS: SkillScenario[] = [
  {
    id: 'frontend-bug',
    label: '前端 Bug 排查',
    description: '构建报错、运行时报错、样式异常、白屏等问题定位',
  },
  {
    id: 'project-bootstrap',
    label: '项目初始化',
    description: '搭建项目、初始化工程配置、准备开发基线',
  },
  {
    id: 'code-review',
    label: '代码审查',
    description: '检查逻辑风险、回归风险和测试缺口',
  },
  {
    id: 'skill-capture',
    label: 'Skill 沉淀',
    description: '把现有经验整理成可复用 Skill 卡片',
  },
];

export const DEFAULT_SKILLS: Skill[] = [
  {
    id: 'frontend-bug-triage',
    slug: 'frontend-bug-triage',
    name: '前端 Bug 排查 Skill',
    oneLinePurpose: '帮助 AI 按固定流程定位前端报错原因。',
    problemSolved:
      '当页面白屏、控制台报错或构建失败时，快速收敛问题来源，减少盲目试错。',
    whenToUse: '出现前端构建报错、运行时报错、样式异常或接口联调异常时使用。',
    applicableScenarios: ['frontend-bug', 'code-review'],
    triggerKeywords: ['error stack', 'console', '白屏', 'build failed', 'node-sass'],
    triggerConditions: [
      '出现 error stack 或 console 报错',
      '页面白屏但定位不到原因',
      '构建流程失败或样式异常',
    ],
    inputRequirements: ['错误日志', '相关代码文件', '复现步骤', '环境信息'],
    usageMethod: [
      '先收集错误日志与复现步骤',
      '按构建、运行时、样式、接口四个方向排查',
      '输出最可能根因与验证建议',
    ],
    expectedOutput: ['问题根因候选', '排查顺序', '下一步验证建议'],
    sourcePath: 'skills/frontend/bug-triage.md',
    relatedQueries: ['qiankun 子应用白屏', 'node-sass 构建错误', '接口联调异常'],
    updatedAt: '2026-05-24T18:30:00.000Z',
    history: [
      {
        id: 'bug-history-1',
        title: 'node-sass 构建错误排查',
        note: '定位到 node 版本与依赖不兼容，已验证有效。',
        outcome: 'verified',
        createdAt: '2026-05-21T09:00:00.000Z',
      },
      {
        id: 'bug-history-2',
        title: 'qiankun 子应用白屏问题',
        note: '补充了白屏场景下的资源路径检查步骤。',
        outcome: 'updated',
        createdAt: '2026-05-23T14:20:00.000Z',
      },
    ],
  },
  {
    id: 'project-bootstrap-react',
    slug: 'project-bootstrap-react',
    name: 'React 项目初始化 Skill',
    oneLinePurpose: '帮助快速建立新前端项目的基础结构与约束。',
    problemSolved: '避免每次新建项目时重复思考脚手架、目录、规范和基础配置。',
    whenToUse: '准备新建 React 项目或需要补齐已有项目的基础工程能力时使用。',
    applicableScenarios: ['project-bootstrap', 'skill-capture'],
    triggerKeywords: ['初始化项目', 'React 脚手架', '目录结构', '工程化'],
    triggerConditions: [
      '准备新开一个前端项目',
      '需要统一工程结构和基础规范',
    ],
    inputRequirements: ['目标技术栈', '部署方式', '团队约束或已有模板'],
    usageMethod: [
      '先确认技术栈与部署目标',
      '按目录、依赖、路由、代码规范、构建配置整理初始化步骤',
      '输出最小可用工程基线',
    ],
    expectedOutput: ['初始化步骤', '推荐目录结构', '关键依赖与配置清单'],
    sourcePath: 'skills/frontend/react-bootstrap.md',
    relatedQueries: ['我要初始化项目', '搭一个 React + TS 项目'],
    updatedAt: '2026-05-20T16:00:00.000Z',
    history: [
      {
        id: 'bootstrap-history-1',
        title: '新项目工程基线复用',
        note: '整理成适合个人项目的最小模板。',
        outcome: 'verified',
        createdAt: '2026-05-20T16:00:00.000Z',
      },
    ],
  },
  {
    id: 'skill-capture-template',
    slug: 'skill-capture-template',
    name: 'Skill 沉淀卡片化 Skill',
    oneLinePurpose: '把零散经验整理成统一的 Skill 卡片结构。',
    problemSolved: '减少 Skill 散落在项目、聊天记录和文档中的检索与维护成本。',
    whenToUse: '想把已有经验、提示词或工作流整理成可复用 Skill 时使用。',
    applicableScenarios: ['skill-capture'],
    triggerKeywords: ['沉淀 Skill', '卡片化', '复用经验', '知识整理'],
    triggerConditions: [
      '一个技巧已经重复使用过至少一次',
      '希望把聊天记录或项目片段整理成标准结构',
    ],
    inputRequirements: ['Skill 名称', '一句话用途', '适用场景', '使用步骤', '来源'],
    usageMethod: [
      '先抽取 Skill 的核心问题与触发条件',
      '再补齐输入要求、使用方式和输出结果',
      '最后追加最近一次验证记录',
    ],
    expectedOutput: ['结构化 Skill 卡片', '可搜索关键词', '可追溯历史记录'],
    sourcePath: 'skills/workflow/skill-capture-template.md',
    relatedQueries: ['我想沉淀一个 Skill', '怎么把经验整理成 Skill'],
    updatedAt: '2026-05-22T11:30:00.000Z',
    history: [
      {
        id: 'capture-history-1',
        title: '整理前端 Bug 排查 Skill',
        note: '补齐了输入要求与输出结果字段。',
        outcome: 'verified',
        createdAt: '2026-05-22T11:30:00.000Z',
      },
    ],
  },
];
