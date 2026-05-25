import { Button, Card, Empty, Space } from 'antd';
import { history } from 'umi';

export default function NotFoundPage() {
  return (
    <div style={{ maxWidth: 720, margin: '0 auto' }}>
      <Card bordered={false} style={{ borderRadius: 20 }}>
        <Empty description="这个页面不存在，回到首页继续查找 Skill 吧。" />
        <Space style={{ marginTop: 16 }}>
          <Button type="primary" onClick={() => history.push('/')}>
            回到首页
          </Button>
          <Button onClick={() => history.push('/manage')}>去手动维护</Button>
        </Space>
      </Card>
    </div>
  );
}
