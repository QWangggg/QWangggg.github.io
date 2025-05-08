import { Link } from 'umi';
import { Typography, Card, Row, Col, Button, Space, Tag, Divider } from 'antd';
import { ReadOutlined, RightOutlined } from '@ant-design/icons';
import styles from './index.less';

const { Title, Paragraph, Text } = Typography;

export default function IndexPage() {
  return (
    <div className={styles.homeContainer}>
      <Typography className={styles.hero}>
        <Title level={2} className={styles.pageTitle}>
          Welcome to QWang's Tech Blog
        </Title>
        <Paragraph className={styles.pageDescription}>
          Exploring the world of full-stack development, cloud architecture, and
          algorithm design.
        </Paragraph>
        <Space size="middle">
          <Button type="primary" size="large">
            开始探索 <RightOutlined />
          </Button>
          <Button size="large">订阅更新</Button>
        </Space>
      </Typography>

      <Divider orientation="left">精选文章</Divider>

      <Row gutter={[24, 24]} className={styles.postGrid}>
        <Col xs={24} sm={12} md={8}>
          <Card
            hoverable
            cover={
              <div className={`${styles.postCover} ${styles.postCover1}`} />
            }
            className={styles.postCard}
          >
            <Tag color="blue">前端</Tag>
            <Title level={4}>React 源码解析系列：Fiber 架构</Title>
            <Paragraph ellipsis={{ rows: 3 }} className={styles.postExcerpt}>
              深入解析 React Fiber 架构的设计理念与实现原理，带你理解 React
              中的调度算法与协调机制。
            </Paragraph>
            <Link to="/posts/1" className={styles.readMore}>
              <Space>
                <ReadOutlined />
                <span>阅读全文</span>
              </Space>
            </Link>
          </Card>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Card
            hoverable
            cover={
              <div className={`${styles.postCover} ${styles.postCover2}`} />
            }
            className={styles.postCard}
          >
            <Tag color="green">云原生</Tag>
            <Title level={4}>Kubernetes 排障实战指南</Title>
            <Paragraph ellipsis={{ rows: 3 }} className={styles.postExcerpt}>
              基于生产环境案例，分享 K8s
              集群常见问题排查方法与最佳实践，从容应对各类集群异常。
            </Paragraph>
            <Link to="/posts/2" className={styles.readMore}>
              <Space>
                <ReadOutlined />
                <span>阅读全文</span>
              </Space>
            </Link>
          </Card>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Card
            hoverable
            cover={
              <div className={`${styles.postCover} ${styles.postCover3}`} />
            }
            className={styles.postCard}
          >
            <Tag color="purple">算法</Tag>
            <Title level={4}>高频算法题解析：动态规划专题</Title>
            <Paragraph ellipsis={{ rows: 3 }} className={styles.postExcerpt}>
              详解动态规划的核心思想与解题模板，通过经典例题培养算法思维，提升解题能力。
            </Paragraph>
            <Link to="/posts/3" className={styles.readMore}>
              <Space>
                <ReadOutlined />
                <span>阅读全文</span>
              </Space>
            </Link>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
