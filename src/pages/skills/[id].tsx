import { Alert, Button, Card, Descriptions, Empty, List, Space, Tag, Typography } from 'antd';
import { useMemo } from 'react';
import { history, Link, useParams } from 'umi';

import { getScenarioById, getSkillById } from '@/features/skills/selectors';

const { Title, Paragraph, Text } = Typography;

export default function SkillDetailPage() {
  const params = useParams<{ id: string }>();
  const skill = useMemo(() => getSkillById(params.id), [params.id]);

  if (!skill) {
    return (
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <Card bordered={false} style={{ borderRadius: 20 }}>
          <Empty description="没有找到这个 Skill，你可以回到结果页重新选择，或手动新增一个。" />
          <Space style={{ marginTop: 16 }}>
            <Button onClick={() => history.push('/results')}>回到结果页</Button>
            <Button type="primary" onClick={() => history.push('/manage')}>
              去手动维护
            </Button>
          </Space>
        </Card>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 980, margin: '0 auto' }}>
      <Space direction="vertical" size={20} style={{ display: 'flex' }}>
        <Card bordered={false} style={{ borderRadius: 20 }}>
          <Space direction="vertical" size={14} style={{ display: 'flex' }}>
            <Space wrap>
              {skill.applicableScenarios.map((scenarioId) => (
                <Tag key={scenarioId} color="green">
                  {getScenarioById(scenarioId)?.label ?? scenarioId}
                </Tag>
              ))}
            </Space>
            <div>
              <Title level={2} style={{ marginBottom: 8 }}>
                {skill.name}
              </Title>
              <Paragraph style={{ fontSize: 16, marginBottom: 0 }}>{skill.oneLinePurpose}</Paragraph>
            </div>
            <Space wrap>
              <Button onClick={() => history.back()}>返回上一页</Button>
              <Button type="primary">
                <Link to={`/manage?id=${skill.id}`}>编辑这个 Skill</Link>
              </Button>
            </Space>
          </Space>
        </Card>

        <Card bordered={false} style={{ borderRadius: 20 }}>
          <Descriptions title="完整使用信息" column={1} labelStyle={{ width: 160, fontWeight: 600 }}>
            <Descriptions.Item label="解决什么问题">{skill.problemSolved}</Descriptions.Item>
            <Descriptions.Item label="什么时候用">{skill.whenToUse}</Descriptions.Item>
            <Descriptions.Item label="触发条件">
              <List
                size="small"
                dataSource={skill.triggerConditions}
                renderItem={(item) => <List.Item>{item}</List.Item>}
              />
            </Descriptions.Item>
            <Descriptions.Item label="输入要求">
              <List
                size="small"
                dataSource={skill.inputRequirements}
                renderItem={(item) => <List.Item>{item}</List.Item>}
              />
            </Descriptions.Item>
            <Descriptions.Item label="使用方式">
              <List size="small" dataSource={skill.usageMethod} renderItem={(item) => <List.Item>{item}</List.Item>} />
            </Descriptions.Item>
            <Descriptions.Item label="预期输出">
              <List
                size="small"
                dataSource={skill.expectedOutput}
                renderItem={(item) => <List.Item>{item}</List.Item>}
              />
            </Descriptions.Item>
            <Descriptions.Item label="来源路径">
              <Text code>{skill.sourcePath}</Text>
            </Descriptions.Item>
            <Descriptions.Item label="相关关键词">
              <Space wrap>
                {skill.triggerKeywords.concat(skill.relatedQueries).map((item) => (
                  <Tag key={item}>{item}</Tag>
                ))}
              </Space>
            </Descriptions.Item>
          </Descriptions>
        </Card>

        <Card bordered={false} style={{ borderRadius: 20 }}>
          <Space direction="vertical" size={12} style={{ display: 'flex' }}>
            <Title level={4} style={{ marginBottom: 0 }}>
              使用与修改记录
            </Title>
            <Paragraph style={{ marginBottom: 0 }}>
              这里只保留轻量历史，帮助你判断这个 Skill 是否真的可复用。
            </Paragraph>
            {!skill.history.length ? (
              <Alert type="info" showIcon message="暂无历史记录，可在编辑时手动追加。" />
            ) : (
              <List
                itemLayout="vertical"
                dataSource={skill.history}
                renderItem={(entry) => (
                  <List.Item key={entry.id}>
                    <List.Item.Meta
                      title={
                        <Space wrap>
                          <span>{entry.title}</span>
                          {entry.outcome ? <Tag color="blue">{entry.outcome}</Tag> : null}
                        </Space>
                      }
                      description={new Date(entry.createdAt).toLocaleString('zh-CN')}
                    />
                    <Paragraph style={{ marginBottom: 0 }}>{entry.note ?? '暂无补充说明。'}</Paragraph>
                  </List.Item>
                )}
              />
            )}
          </Space>
        </Card>
      </Space>
    </div>
  );
}
