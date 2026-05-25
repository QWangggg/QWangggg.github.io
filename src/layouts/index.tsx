import { HistoryOutlined, SearchOutlined, ToolOutlined } from '@ant-design/icons';
import { Layout, Menu, Typography } from 'antd';
import { Link, useLocation } from 'umi';
import type { PropsWithChildren } from 'react';

const { Header, Content } = Layout;
const { Title, Paragraph } = Typography;

const menuItems = [
  { key: '/', label: <Link to="/">场景检索</Link>, icon: <SearchOutlined /> },
  { key: '/results', label: <Link to="/results">结果判断</Link>, icon: <HistoryOutlined /> },
  { key: '/manage', label: <Link to="/manage">手动维护</Link>, icon: <ToolOutlined /> },
];

function getSelectedKey(pathname: string) {
  if (pathname.startsWith('/skills/')) {
    return '/results';
  }

  if (pathname.startsWith('/manage')) {
    return '/manage';
  }

  if (pathname.startsWith('/results')) {
    return '/results';
  }

  return '/';
}

export default function AppLayout(props: PropsWithChildren<Record<string, never>>) {
  const location = useLocation();

  return (
    <Layout style={{ minHeight: '100vh', background: '#f5f7fb' }}>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingInline: 24,
          background:
            'linear-gradient(120deg, rgba(11,61,48,1) 0%, rgba(17,106,83,1) 55%, rgba(24,138,108,1) 100%)',
          position: 'sticky',
          top: 0,
          zIndex: 20,
          height: 'auto',
          minHeight: 72,
          lineHeight: 1.4,
        }}
      >
        <div style={{ color: '#fff', marginRight: 24 }}>
          <Title level={4} style={{ color: '#fff', margin: 0 }}>
            AI Coding Skill Workflow Platform
          </Title>
          <Paragraph style={{ color: 'rgba(255,255,255,0.78)', margin: 0 }}>
            搜索优先、场景辅助、可持续沉淀的个人 Skill 工作流平台
          </Paragraph>
        </div>
        <Menu
          mode="horizontal"
          selectedKeys={[getSelectedKey(location.pathname)]}
          items={menuItems}
          style={{
            minWidth: 320,
            background: 'transparent',
            color: '#fff',
            borderBottom: 'none',
            flex: 1,
            justifyContent: 'flex-end',
          }}
          theme="dark"
        />
      </Header>
      <Content style={{ padding: '32px 20px 48px' }}>{props.children}</Content>
    </Layout>
  );
}
