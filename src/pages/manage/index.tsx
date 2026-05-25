import { Button, Card, Checkbox, Divider, Form, Input, Select, Space, Typography, message } from 'antd';
import { useMemo } from 'react';
import { history, useLocation } from 'umi';

import { getAllScenarios, getAllSkills, getSkillById } from '@/features/skills/selectors';
import { upsertSkill } from '@/features/skills/storage';

const { Title, Paragraph, Text } = Typography;
const { TextArea } = Input;

const arrayFields = [
  'triggerKeywords',
  'triggerConditions',
  'inputRequirements',
  'usageMethod',
  'expectedOutput',
  'relatedQueries',
] as const;

type ArrayFieldName = typeof arrayFields[number];

function stringToArray(value?: string) {
  return (value ?? '')
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean);
}

function arrayToString(value?: string[]) {
  return (value ?? []).join('\n');
}

export default function ManagePage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const skillId = searchParams.get('id') ?? '';
  const existingSkill = skillId ? getSkillById(skillId) : undefined;
  const [form] = Form.useForm();
  const scenarios = useMemo(() => getAllScenarios(), []);
  const skills = useMemo(() => getAllSkills(), []);

  const initialValues = useMemo(
    () => ({
      id: existingSkill?.id,
      name: existingSkill?.name ?? '',
      oneLinePurpose: existingSkill?.oneLinePurpose ?? '',
      problemSolved: existingSkill?.problemSolved ?? '',
      whenToUse: existingSkill?.whenToUse ?? '',
      applicableScenarios: existingSkill?.applicableScenarios ?? [],
      triggerKeywords: arrayToString(existingSkill?.triggerKeywords),
      triggerConditions: arrayToString(existingSkill?.triggerConditions),
      inputRequirements: arrayToString(existingSkill?.inputRequirements),
      usageMethod: arrayToString(existingSkill?.usageMethod),
      expectedOutput: arrayToString(existingSkill?.expectedOutput),
      relatedQueries: arrayToString(existingSkill?.relatedQueries),
      sourcePath: existingSkill?.sourcePath ?? '',
      historyNote: '',
    }),
    [existingSkill],
  );

  const handleFinish = (values: any) => {
    const payload = {
      ...values,
      applicableScenarios: values.applicableScenarios ?? [],
      triggerKeywords: stringToArray(values.triggerKeywords),
      triggerConditions: stringToArray(values.triggerConditions),
      inputRequirements: stringToArray(values.inputRequirements),
      usageMethod: stringToArray(values.usageMethod),
      expectedOutput: stringToArray(values.expectedOutput),
      relatedQueries: stringToArray(values.relatedQueries),
    };

    const nextSkill = upsertSkill(payload);
    message.success(existingSkill ? 'Skill 已更新。' : 'Skill 已创建。');
    history.push(`/skills/${nextSkill.id}`);
  };

  return (
    <div style={{ maxWidth: 1120, margin: '0 auto' }}>
      <Space direction="vertical" size={20} style={{ display: 'flex' }}>
        <div>
          <Title level={2} style={{ marginBottom: 8 }}>
            手动维护 Skill
          </Title>
          <Paragraph style={{ marginBottom: 0 }}>
            第一版只验证统一卡片 + 场景检索是否成立，所以先用手动维护，不引入后端和自动导入。
          </Paragraph>
        </div>

        <Card bordered={false} style={{ borderRadius: 20 }}>
          <Space direction="vertical" size={16} style={{ display: 'flex' }}>
            <div>
              <Text strong>快速编辑现有 Skill</Text>
              <Paragraph type="secondary" style={{ marginBottom: 0 }}>
                先选一个已有 Skill 再编辑；如果不选，就默认创建新 Skill。
              </Paragraph>
            </div>
            <Select
              allowClear
              placeholder="选择已有 Skill"
              value={existingSkill?.id || undefined}
              onChange={(value) => history.push(value ? `/manage?id=${value}` : '/manage')}
              options={skills.map((skill) => ({ label: skill.name, value: skill.id }))}
            />
          </Space>
        </Card>

        <Card bordered={false} style={{ borderRadius: 20 }}>
          <Form
            form={form}
            layout="vertical"
            initialValues={initialValues}
            onFinish={handleFinish}
            key={existingSkill?.id ?? 'new-skill-form'}
          >
            <Form.Item name="id" hidden>
              <Input />
            </Form.Item>

            <Space direction="vertical" size={24} style={{ display: 'flex' }}>
              <div>
                <Title level={4} style={{ marginBottom: 8 }}>
                  基础信息
                </Title>
                <Paragraph type="secondary" style={{ marginBottom: 0 }}>
                  必填字段尽量贴近当前真实使用，不追求抽象完整。
                </Paragraph>
              </div>

              <Form.Item label="Skill 名称" name="name" rules={[{ required: true, message: '请输入 Skill 名称' }]}>
                <Input placeholder="例如：前端 Bug 排查 Skill" />
              </Form.Item>

              <Form.Item
                label="一句话用途"
                name="oneLinePurpose"
                rules={[{ required: true, message: '请输入一句话用途' }]}
              >
                <Input placeholder="帮助 AI 按固定流程定位前端报错原因。" />
              </Form.Item>

              <Form.Item
                label="解决什么问题"
                name="problemSolved"
                rules={[{ required: true, message: '请输入核心问题' }]}
              >
                <TextArea rows={3} />
              </Form.Item>

              <Form.Item
                label="什么时候用"
                name="whenToUse"
                rules={[{ required: true, message: '请输入使用时机' }]}
              >
                <TextArea rows={3} />
              </Form.Item>

              <Form.Item
                label="适用场景"
                name="applicableScenarios"
                rules={[{ required: true, message: '至少选择一个适用场景' }]}
              >
                <Checkbox.Group
                  options={scenarios.map((scenario) => ({ label: scenario.label, value: scenario.id }))}
                />
              </Form.Item>

              <Divider />

              <Title level={4} style={{ marginBottom: 0 }}>
                触发条件与输入
              </Title>

              {arrayFields.slice(0, 3).map((fieldName) => (
                <Form.Item
                  key={fieldName}
                  label={
                    fieldName === 'triggerKeywords'
                      ? '触发关键词'
                      : fieldName === 'triggerConditions'
                      ? '触发条件'
                      : '输入要求'
                  }
                  name={fieldName}
                  rules={[{ required: true, message: '请填写至少一项内容' }]}
                >
                  <TextArea rows={4} placeholder="每行一项" />
                </Form.Item>
              ))}

              <Divider />

              <Title level={4} style={{ marginBottom: 0 }}>
                使用方式与输出
              </Title>

              {arrayFields.slice(3).map((fieldName: ArrayFieldName) => (
                <Form.Item
                  key={fieldName}
                  label={fieldName === 'usageMethod' ? '使用方式' : fieldName === 'expectedOutput' ? '预期输出' : '相关查询示例'}
                  name={fieldName}
                  rules={fieldName === 'relatedQueries' ? undefined : [{ required: true, message: '请填写至少一项内容' }]}
                >
                  <TextArea rows={4} placeholder="每行一项" />
                </Form.Item>
              ))}

              <Form.Item
                label="来源链接 / 路径"
                name="sourcePath"
                rules={[{ required: true, message: '请输入来源路径' }]}
              >
                <Input placeholder="skills/frontend/bug-triage.md" />
              </Form.Item>

              <Divider />

              <Title level={4} style={{ marginBottom: 0 }}>
                轻量历史记录
              </Title>
              <Form.Item label="追加一条历史说明（可选）" name="historyNote">
                <TextArea rows={3} placeholder="例如：上次用于 qiankun 子应用白屏排查，已验证有效。" />
              </Form.Item>

              <Space wrap>
                <Button type="primary" htmlType="submit">
                  {existingSkill ? '保存更新' : '创建 Skill'}
                </Button>
                <Button onClick={() => history.push(existingSkill ? `/skills/${existingSkill.id}` : '/')}>取消</Button>
              </Space>
            </Space>
          </Form>
        </Card>
      </Space>
    </div>
  );
}
