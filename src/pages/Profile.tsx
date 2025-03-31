import React from 'react';
import { Typography, Card, Avatar, Descriptions } from '@douyinfe/semi-ui';

const Profile: React.FC = () => {
  const { Title } = Typography;

  return (
    <div style={{ padding: '20px' }}>
      <Title heading={2}>个人中心</Title>
      <Card style={{ maxWidth: 800, margin: '20px 0' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', padding: '20px' }}>
          <Avatar
            size="large"
            style={{ margin: '0 20px 0 0' }}
            src="https://sf6-cdn-tos.douyinstatic.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/avatarDemo.jpeg"
          />
          <Descriptions 
            data={[
              { key: '用户名', value: 'Bruno Wang' },
              { key: '邮箱', value: 'bruno@example.com' },
              { key: '注册时间', value: '2023-06-01' },
              { key: '账户状态', value: '正常' },
            ]} 
          />
        </div>
      </Card>
      
      <Card style={{ maxWidth: 800 }}>
        <Title heading={4}>账户统计</Title>
        <Descriptions 
          data={[
            { key: '上传视频', value: '12 个' },
            { key: '获赞数量', value: '253' },
            { key: '评论数量', value: '42' },
            { key: '观看时长', value: '186 小时' },
          ]} 
        />
      </Card>
    </div>
  );
};

export default Profile;