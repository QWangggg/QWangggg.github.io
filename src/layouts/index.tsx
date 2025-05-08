import { Link, IRouteComponentProps, history } from 'umi';
import { useState, useEffect } from 'react';
import {
  Layout,
  Menu,
  Typography,
  Avatar,
  Tag,
  Space,
  Divider,
  Progress,
  Input,
  Badge,
  Card,
  Button,
  Tooltip,
  Switch,
} from 'antd';
import {
  HomeOutlined,
  BookOutlined,
  RocketOutlined,
  EditOutlined,
  LaptopOutlined,
  CloudOutlined,
  CalculatorOutlined,
  SearchOutlined,
  RightOutlined,
  GithubOutlined,
  TwitterOutlined,
  MailOutlined,
  TeamOutlined,
  QuestionCircleOutlined,
  CaretRightOutlined,
} from '@ant-design/icons';
import styles from './index.less';

const { Header, Sider, Content, Footer } = Layout;
const { Title, Text, Paragraph } = Typography;
const { SubMenu } = Menu;

interface ExpandedSections {
  frontend: boolean;
  cloud: boolean;
  algorithms: boolean;
  [key: string]: boolean;
}

export default function AppLayout({ children }: IRouteComponentProps) {
  const currentYear = new Date().getFullYear();
  const currentPath = history.location.pathname;
  const [darkMode, setDarkMode] = useState<boolean>(false);

  // Learning sections with collapsible state
  const [expandedSections, setExpandedSections] = useState<ExpandedSections>({
    frontend: true,
    cloud: false,
    algorithms: false,
  });

  // Load dark mode preference from localStorage
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode) {
      setDarkMode(savedDarkMode === 'true');
    }
  }, []);

  // Toggle dark mode
  const toggleDarkMode = (checked: boolean) => {
    setDarkMode(checked);
    localStorage.setItem('darkMode', String(checked));
  };

  const toggleSection = (section: string) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section],
    });
  };

  const getSelectedKeys = () => {
    if (currentPath === '/') return ['home'];
    if (currentPath === '/posts') return ['posts'];
    if (currentPath.startsWith('/posts/')) return ['posts'];
    if (currentPath === '/about') return ['about'];
    return [];
  };

  return (
    <Layout
      className={`${styles.appLayout} ${darkMode ? styles.darkMode : ''}`}
    >
      <Sider
        width={280}
        theme={darkMode ? 'dark' : 'light'}
        className={styles.sidebar}
        breakpoint="lg"
        collapsedWidth="0"
      >
        {/* Core Identity Section */}
        <div className={styles.identitySection} style={{ marginTop: '10px' }}>
          <Avatar size={80} icon={<HomeOutlined />} className={styles.avatar} />
          <Title level={4} className={styles.siteTitle}>
            QWang
          </Title>
          <Text type="secondary" className={styles.tagline}>
            Full-Stack Learner | Tech Explorer
          </Text>

          <div className={styles.skillTags}>
            <Tag color="blue">React</Tag>
            <Tag color="green">Node.js</Tag>
            <Tag color="magenta">K8s</Tag>
            <Tag color="orange">AWS</Tag>
            <Tag color="purple">ML</Tag>
          </div>
        </div>

        {/* Quick Access Buttons */}
        <div className={styles.quickAccess}>
          <Button type="default" className={styles.quickButton} block>
            <div className={styles.buttonInner}>
              <BookOutlined className={styles.buttonIcon} />
              <span>学习文档库</span>
            </div>
          </Button>

          <Badge.Ribbon text="New" color="red">
            <Button type="default" className={styles.quickButton} block>
              <div className={styles.buttonInner}>
                <RocketOutlined className={styles.buttonIcon} />
                <span>项目展示墙</span>
              </div>
            </Button>
          </Badge.Ribbon>

          <Button type="default" className={styles.quickButton} block>
            <div className={styles.buttonInner}>
              <EditOutlined className={styles.buttonIcon} />
              <span>即刻写作</span>
            </div>
          </Button>
        </div>

        <Divider orientation="left" plain style={{ margin: '12px 0 16px' }}>
          技术栈分类
        </Divider>

        {/* Learning Tree */}
        <Menu
          mode="inline"
          defaultSelectedKeys={['home']}
          defaultOpenKeys={['frontend']}
          selectedKeys={getSelectedKeys()}
          className={styles.treeNav}
          style={{ borderRight: 'none' }}
          theme={darkMode ? 'dark' : 'light'}
        >
          <SubMenu key="frontend" icon={<LaptopOutlined />} title="前端工程">
            <Menu.Item key="react-source">
              <Link to="/docs/react-source">React源码解析</Link>
            </Menu.Item>
            <Menu.Item key="webpack">
              <Link to="/docs/webpack">Webpack实战</Link>
            </Menu.Item>
          </SubMenu>

          <SubMenu key="cloud" icon={<CloudOutlined />} title="云原生">
            <Menu.Item key="k8s">
              <Badge count="HOT" size="small" offset={[5, 0]}>
                <Link to="/docs/k8s-troubleshooting">K8s排错指南</Link>
              </Badge>
            </Menu.Item>
            <Menu.Item key="service-mesh">
              <Link to="/docs/service-mesh">ServiceMesh实践</Link>
            </Menu.Item>
          </SubMenu>

          <SubMenu
            key="algorithms"
            icon={<CalculatorOutlined />}
            title="算法专栏"
          >
            <Menu.Item key="leetcode">
              <Link to="/docs/leetcode">LeetCode精解</Link>
            </Menu.Item>
            <Menu.Item key="system-design">
              <Link to="/docs/system-design">系统设计案例</Link>
            </Menu.Item>
          </SubMenu>
        </Menu>

        <Divider orientation="left" plain style={{ margin: '12px 0 16px' }}>
          项目矩阵
        </Divider>

        {/* Project Tags */}
        <div className={styles.projectFilters}>
          <div className={styles.projectTags}>
            <Tag.CheckableTag className={styles.projectTag} checked={true}>
              全部
            </Tag.CheckableTag>
            <Tag.CheckableTag className={styles.projectTag} checked={false}>
              开源贡献
            </Tag.CheckableTag>
            <Tag.CheckableTag className={styles.projectTag} checked={false}>
              全栈项目
            </Tag.CheckableTag>
            <Tag.CheckableTag className={styles.projectTag} checked={false}>
              实验Demo
            </Tag.CheckableTag>
          </div>

          <div className={styles.filterTags}>
            <Tag color="green">#微服务</Tag>
            <Tag color="purple">#AI应用</Tag>
            <Tag color="blue">#性能优化</Tag>
          </div>
        </div>

        {/* Search */}
        <div className={styles.searchSection}>
          <Input
            prefix={<SearchOutlined />}
            placeholder="搜索文章 (tag:docker 2023)"
            className={styles.searchInput}
          />
          <div className={styles.hotKeywords}>
            <Text type="secondary" className={styles.hotKeyword}>
              kubernetes
            </Text>
            <Text type="secondary" className={styles.hotKeyword}>
              react
            </Text>
          </div>
        </div>

        {/* Learning Progress */}
        <Card className={styles.progressCard} size="small" title="学习进度">
          <div className={styles.milestone}>
            <Text className={styles.milestoneName}>K8s学习路线</Text>
            <Progress percent={75} size="small" status="active" />
          </div>
          <div className={styles.weeklyStats}>
            <Space className={styles.statsHeader}>
              <Text className={styles.statsLabel}>本周已投入</Text>
              <Text type="success" strong className={styles.statsValue}>
                18h
              </Text>
            </Space>
            <Progress percent={60} size="small" strokeColor="#1DA57A" />
          </div>
        </Card>

        {/* Developer Card */}
        <Card className={styles.devCard} size="small">
          <div className={styles.githubActivity}>
            <div className={styles.activityGraph}>
              {[0.2, 0.4, 0.8, 0.3, 0.9, 0.5, 0.7].map((opacity, index) => (
                <div
                  key={index}
                  className={styles.graphCell}
                  style={{ opacity }}
                />
              ))}
            </div>
          </div>

          <div
            className={styles.certBadges}
            style={{ marginTop: '10px', marginBottom: '10px' }}
          >
            <Tag>AWS</Tag>
            <Tag>CKAD</Tag>
          </div>

          <Space className={styles.socialLinks}>
            <Tooltip title="GitHub">
              <Button
                type="text"
                icon={<GithubOutlined />}
                href="https://github.com/QWangggg"
                target="_blank"
              />
            </Tooltip>
            <Tooltip title="Twitter">
              <Button
                type="text"
                icon={<TwitterOutlined />}
                href="#"
                target="_blank"
              />
            </Tooltip>
            <Tooltip title="Email">
              <Button
                type="text"
                icon={<MailOutlined />}
                href="mailto:example@example.com"
              />
            </Tooltip>
          </Space>

          <div
            className={styles.communitySection}
            style={{ marginTop: '10px' }}
          >
            <Button
              type="primary"
              icon={<QuestionCircleOutlined />}
              size="small"
              style={{ marginBottom: '8px' }}
            >
              向我提问
            </Button>
            <Button
              type="primary"
              icon={<TeamOutlined />}
              size="small"
              style={{ width: '100%' }}
            >
              技术交流群{' '}
              <Badge count={128} size="small" style={{ marginLeft: '5px' }} />
            </Button>
          </div>
        </Card>

        <div className={styles.sidebarFooter} style={{ marginTop: '20px' }}>
          <Space className={styles.themeToggle}>
            <Text type="secondary">暗黑模式</Text>
            <Switch size="small" checked={darkMode} onChange={toggleDarkMode} />
          </Space>
          <Text type="secondary" className={styles.copyright}>
            © {currentYear} QWang's Tech Blog
          </Text>
        </div>
      </Sider>

      <Layout className={styles.mainContent}>
        <Content className={styles.content}>{children}</Content>

        <Footer className={styles.footer}>
          <Text type="secondary">
            © {currentYear} QWang's Tech Blog. All rights reserved.
          </Text>
        </Footer>
      </Layout>
    </Layout>
  );
}
