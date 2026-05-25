import { Alert, Card, Empty, List, Space, Tag, Typography } from 'antd';
import { Link, useLocation } from 'umi';

import { getAllSkills, getScenarioById } from '@/features/skills/selectors';

const { Title, Paragraph, Text } = Typography;

function includesKeyword(skillField: string[], query: string) {
  const normalized = query.toLowerCase();
  return skillField.some((value) => value.toLowerCase().includes(normalized));
}

export default function ResultsPage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('q')?.trim() ?? '';
  const scenarioId = searchParams.get('scenario')?.trim() ?? '';
  const scenario = scenarioId ? getScenarioById(scenarioId) : undefined;

  const skills = getAllSkills()
    .filter((skill) => {
      const matchesScenario = scenarioId ? skill.applicableScenarios.includes(scenarioId) : true;

      if (!matchesScenario) {
        return false;
      }

      if (!query) {
        return true;
      }

      const haystack = [
        skill.name,
        skill.oneLinePurpose,
        skill.problemSolved,
        skill.whenToUse,
        skill.sourcePath,
        ...skill.triggerKeywords,
        ...skill.triggerConditions,
        ...skill.inputRequirements,
        ...skill.relatedQueries,
      ]
        .join(' ')
        .toLowerCase();

      return haystack.includes(query.toLowerCase());
    })
    .map((skill) => {
      const reasons: string[] = [];

      if (scenario && skill.applicableScenarios.includes(scenario.id)) {
        reasons.push(`命中场景：${scenario.label}`);
      }

      if (query) {
        if (includesKeyword(skill.triggerKeywords, query)) {
          reasons.push('命中触发关键词');
        }

        if (includesKeyword(skill.relatedQueries, query)) {
          reasons.push('命中相似问题');
        }

        if (!reasons.length) {
          reasons.push('命中用途与问题描述');
        }
      }

      return { ...skill, reasons };
    });

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto' }}>
      <Space direction="vertical" size={20} style={{ display: 'flex' }}>
        <div>
          <Title level={2} style={{ marginBottom: 8 }}>
            场景结果页
          </Title>
          <Paragraph style={{ marginBottom: 0 }}>
            先判断“哪个 Skill 值得点开”，再进入详情页消费。
          </Paragraph>
        </div>

        {(query || scenario) && (
          <Alert
            type="info"
            showIcon
            message="当前检索上下文"
            description={
              <Space wrap>
                {query ? <Tag color="green">关键词：{query}</Tag> : null}
                {scenario ? <Tag color="blue">场景：{scenario.label}</Tag> : null}
              </Space>
            }
          />
        )}

        <Card bordered={false} style={{ borderRadius: 20 }}>
          {!skills.length ? (
            <Empty
              description="当前条件下没有找到可用 Skill，试试换个关键词或回到首页从场景入口进入。"
            />
          ) : (
            <List
              dataSource={skills}
              itemLayout="vertical"
              renderItem={(skill) => (
                <List.Item key={skill.id}>
                  <Card
                    hoverable
                    style={{ borderRadius: 18 }}
                    bodyStyle={{ padding: 24 }}
                    actions={[
                      <Link key="detail" to={`/skills/${skill.id}`}>
                        查看详情
                      </Link>,
                    ]}
                  >
                    <Space direction="vertical" size={12} style={{ display: 'flex' }}>
                      <div>
                        <Title level={4} style={{ marginBottom: 8 }}>
                          {skill.name}
                        </Title>
                        <Paragraph style={{ marginBottom: 0 }}>{skill.oneLinePurpose}</Paragraph>
                      </div>

                      <div>
                        <Text strong>为什么匹配：</Text>
                        <Space wrap style={{ marginLeft: 8 }}>
                          {skill.reasons.map((reason) => (
                            <Tag key={reason} color="gold">
                              {reason}
                            </Tag>
                          ))}
                        </Space>
                      </div>

                      <div>
                        <Text strong>适用场景：</Text>
                        <Space wrap style={{ marginLeft: 8 }}>
                          {skill.applicableScenarios.map((scenarioValue) => (
                            <Tag key={scenarioValue}>{getScenarioById(scenarioValue)?.label ?? scenarioValue}</Tag>
                          ))}
                        </Space>
                      </div>

                      <div>
                        <Text strong>触发条件 / 关键词：</Text>
                        <Text style={{ marginLeft: 8 }}>
                          {[...skill.triggerConditions, ...skill.triggerKeywords].slice(0, 4).join(' / ')}
                        </Text>
                      </div>

                      <div>
                        <Text strong>输入要求：</Text>
                        <Text style={{ marginLeft: 8 }}>{skill.inputRequirements.join(' / ')}</Text>
                      </div>

                      <div>
                        <Text strong>最近记录：</Text>
                        <Text style={{ marginLeft: 8 }}>
                          {skill.history[0]?.title ?? '暂无历史记录，可在维护页补充。'}
                        </Text>
                      </div>
                    </Space>
                  </Card>
                </List.Item>
              )}
            />
          )}
        </Card>
      </Space>
    </div>
  );
}
