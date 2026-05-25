import { Button, Card, Col, Input, Row, Space, Tag, Typography } from 'antd';
import { useMemo, useState } from 'react';
import { history } from 'umi';

import { getAllScenarios, getAllSkills } from '@/features/skills/selectors';

const { Title, Paragraph, Text } = Typography;
const { Search } = Input;

export default function HomePage() {
  const [query, setQuery] = useState('');
  const scenarios = useMemo(() => getAllScenarios(), []);
  const stats = useMemo(() => getAllSkills(), []);

  const goToResults = (nextQuery?: string, scenarioId?: string) => {
    const searchParams = new URLSearchParams();

    if (nextQuery?.trim()) {
      searchParams.set('q', nextQuery.trim());
    }

    if (scenarioId) {
      searchParams.set('scenario', scenarioId);
    }

    history.push(`/results${searchParams.toString() ? `?${searchParams.toString()}` : ''}`);
  };

  return (
    <div style={{ maxWidth: 1180, margin: '0 auto' }}>
      <Card
        bordered={false}
        style={{
          borderRadius: 24,
          boxShadow: '0 20px 60px rgba(11, 61, 48, 0.12)',
          overflow: 'hidden',
          background:
            'linear-gradient(135deg, rgba(245,252,249,1) 0%, rgba(228,246,240,1) 55%, rgba(217,239,231,1) 100%)',
        }}
        bodyStyle={{ padding: 32 }}
      >
        <Space direction="vertical" size={24} style={{ display: 'flex' }}>
          <div>
            <Tag color="green" style={{ borderRadius: 999, paddingInline: 12, marginBottom: 12 }}>
              Search-first MVP
            </Tag>
            <Title level={1} style={{ marginTop: 0, marginBottom: 12 }}>
              先描述你现在卡在哪，再去找合适的 Skill
            </Title>
            <Paragraph style={{ fontSize: 16, maxWidth: 820, marginBottom: 0 }}>
              你不需要先记住 Skill 名称。直接输入当前任务、问题或关键词，再用场景入口辅助缩小范围，
              快速判断哪个 Skill 值得点开复用。
            </Paragraph>
          </div>

          <Search
            size="large"
            placeholder="例如：qiankun 子应用白屏 / 我要初始化项目 / 我想沉淀一个 Skill"
            value={query}
            enterButton="开始查找"
            onChange={(event) => setQuery(event.target.value)}
            onSearch={(value) => goToResults(value)}
          />

          <Space wrap size={[8, 8]}>
            {['qiankun 子应用白屏', '我要初始化项目', 'node-sass 构建错误', '我想沉淀一个 Skill'].map(
              (keyword) => (
                <Button key={keyword} shape="round" onClick={() => goToResults(keyword)}>
                  {keyword}
                </Button>
              ),
            )}
          </Space>
        </Space>
      </Card>

      <Row gutter={[20, 20]} style={{ marginTop: 24 }}>
        <Col xs={24} xl={16}>
          <Card bordered={false} style={{ borderRadius: 20 }}>
            <Space direction="vertical" size={16} style={{ display: 'flex' }}>
              <div>
                <Title level={3} style={{ marginBottom: 8 }}>
                  常用场景入口
                </Title>
                <Paragraph style={{ marginBottom: 0 }}>
                  不想先想关键词时，可以从场景进入。它是辅助入口，不会盖过自由检索。
                </Paragraph>
              </div>
              <Row gutter={[16, 16]}>
                {scenarios.map((scenario) => (
                  <Col xs={24} md={12} key={scenario.id}>
                    <Card
                      hoverable
                      onClick={() => goToResults(undefined, scenario.id)}
                      style={{ borderRadius: 18, minHeight: 160 }}
                    >
                      <Space direction="vertical" size={8}>
                        <Text strong>{scenario.label}</Text>
                        <Text type="secondary">{scenario.description}</Text>
                      </Space>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Space>
          </Card>
        </Col>

        <Col xs={24} xl={8}>
          <Card bordered={false} style={{ borderRadius: 20, height: '100%' }}>
            <Space direction="vertical" size={18} style={{ display: 'flex' }}>
              <div>
                <Title level={3} style={{ marginBottom: 8 }}>
                  当前库状态
                </Title>
                <Paragraph style={{ marginBottom: 0 }}>
                  先用手动维护验证卡片化与检索是否成立，不引入后端和自动化。
                </Paragraph>
              </div>
              <div>
                <Text type="secondary">Skill 数量</Text>
                <Title level={2} style={{ marginTop: 4, marginBottom: 0 }}>
                  {stats.length}
                </Title>
              </div>
              <div>
                <Text type="secondary">覆盖场景</Text>
                <Title level={2} style={{ marginTop: 4, marginBottom: 0 }}>
                  {scenarios.length}
                </Title>
              </div>
              <Button type="primary" size="large" onClick={() => history.push('/manage')}>
                去手动维护 Skill
              </Button>
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
