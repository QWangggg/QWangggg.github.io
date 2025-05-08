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
        { path: '/posts', component: '@/pages/posts/index' },
        { path: '/posts/:id', component: '@/pages/posts/post' },
        { path: '/about', component: '@/pages/about' },
      ],
    },
  ],
  fastRefresh: {},
  base: '/',
  publicPath: './',
  hash: true,
  title: 'My React Blog',
  theme: {
    'primary-color': '#1DA57A',
    'link-color': '#1DA57A',
    'border-radius-base': '4px',
  },
  webpack5: {},
  mfsu: {},
});
