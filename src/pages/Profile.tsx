import React, { useState, useEffect } from 'react';
import {Typography, Card, Avatar, Descriptions, Spin} from '@douyinfe/semi-ui';
import { getUserProfile, UserProfile } from '../components/apiService';

const Profile: React.FC = () => {
    const {Title} = Typography;
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                setLoading(true);
                const data = await getUserProfile();
                setProfile(data);
                setError('');
            } catch (err) {
                console.error('获取个人信息失败:', err);
                setError('获取个人信息失败，请稍后重试');
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    if (loading) {
        return (
            <div style={{padding: '20px', textAlign: 'center'}}>
                <Spin size="large" />
            </div>
        );
    }

    if (error) {
        return (
            <div style={{padding: '20px'}}>
                <Title heading={2}>个人中心</Title>
                <Card style={{maxWidth: 800, margin: '20px 0'}}>
                    <div style={{padding: '20px', color: 'red'}}>{error}</div>
                </Card>
            </div>
        );
    }

    return (
        <div style={{padding: '20px'}}>
            <Title heading={2}>个人中心</Title>
            <Card style={{maxWidth: 800, margin: '20px 0'}}>
                <div style={{display: 'flex', alignItems: 'flex-start', padding: '20px'}}>
                    <Avatar
                        size="large"
                        style={{margin: '0 20px 0 0'}}
                        src={profile?.avatar || ''}
                    />
                    <Descriptions
                        data={[
                            {key: '用户名', value: profile?.username || ''},
                            {key: '邮箱', value: profile?.email || ''},
                            {key: '注册时间', value: profile?.registerDate || ''},
                            {key: '账户状态', value: profile?.status || ''},
                        ]}
                    />
                </div>
            </Card>

            <Card style={{maxWidth: 800}}>
                <Title heading={4}>账户统计</Title>
                <Descriptions
                    data={[
                        {key: '上传视频', value: profile?.stats.videos || '0 个'},
                        {key: '获赞数量', value: profile?.stats.likes || '0'},
                        {key: '评论数量', value: profile?.stats.comments || '0'},
                        {key: '观看时长', value: profile?.stats.watchTime || '0 小时'},
                    ]}
                />
            </Card>
        </div>
    );
};

export default Profile;