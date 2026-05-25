import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  antd: {
    dark: false,
    compact: false,
  },
  routes: [
    {
      path: '/',
      component: '@/layouts/index',
      routes: [
        { path: '/', component: '@/pages/index' },
        { path: '/results', component: '@/pages/results/index' },
        { path: '/skills/:id', component: '@/pages/skills/[id]' },
        { path: '/manage', component: '@/pages/manage/index' },
        { component: '@/pages/not-found' },
      ],
    },
  ],
  fastRefresh: {},
  base: '/',
  publicPath: './',
  hash: true,
  title: 'AI Coding Skill Workflow Platform',
  theme: {
    'primary-color': '#1DA57A',
    'link-color': '#1DA57A',
    'border-radius-base': '4px',
  },
  webpack5: {},
  mfsu: {},
});
