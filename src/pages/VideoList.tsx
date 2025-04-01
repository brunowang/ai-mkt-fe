import React, { useState, useEffect } from 'react';
import {Typography, Card, List, Avatar, Tag, Space, Spin} from '@douyinfe/semi-ui';
import {IconLikeThumb, IconComment} from '@douyinfe/semi-icons';
import { getVideos, Video } from '../components/apiService';

const VideoList: React.FC = () => {
    const {Title} = Typography;
    const [videoList, setVideoList] = useState<Video[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                setLoading(true);
                const data = await getVideos();
                setVideoList(data);
                setError('');
            } catch (err) {
                console.error('获取视频列表失败:', err);
                setError('获取视频列表失败，请稍后重试');
            } finally {
                setLoading(false);
            }
        };

        fetchVideos();
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
                <Title heading={2}>视频列表</Title>
                <div style={{padding: '20px', color: 'red'}}>{error}</div>
            </div>
        );
    }

    return (
        <div style={{padding: '20px'}}>
            <Title heading={2}>视频列表</Title>
            <List
                grid={{gutter: 16, span: 8}}
                dataSource={videoList}
                renderItem={item => (
                    <List.Item>
                        <Card
                            shadows="hover"
                            style={{width: '100%', height: 380, display: 'flex', flexDirection: 'column'}}
                            cover={
                                <div style={{position: 'relative', height: 180}}>
                                    <img
                                        alt={item.title}
                                        src={item.cover}
                                        style={{width: '100%', height: '100%', objectFit: 'cover'}}
                                    />
                                    <div style={{
                                        position: 'absolute',
                                        bottom: '8px',
                                        right: '8px',
                                        background: 'rgba(0,0,0,0.65)',
                                        color: 'white',
                                        padding: '2px 6px',
                                        borderRadius: '4px',
                                        fontSize: '12px'
                                    }}>
                                        {item.duration}
                                    </div>
                                </div>
                            }
                        >
                            <Card.Meta
                                title={<div style={{
                                    height: '48px',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    display: '-webkit-box',
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: 'vertical'
                                }}>{item.title}</div>}
                                description={
                                    <div>
                                        <div style={{marginBottom: '8px'}}>
                                            <span style={{
                                                color: 'rgba(0, 0, 0, 0.45)',
                                                marginRight: '8px'
                                            }}>{item.views}次观看</span>
                                            <span style={{color: 'rgba(0, 0, 0, 0.45)'}}>{item.time}</span>
                                        </div>
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center'
                                        }}>
                                            <Space>
                                                <IconLikeThumb size="small"/>{item.likes}
                                                <IconComment size="small"/>{item.comments}
                                            </Space>
                                            <Avatar size="small" src={item.cover}>{item.author[0]}</Avatar>
                                        </div>
                                        <div style={{marginTop: '8px', height: '32px', overflow: 'hidden'}}>
                                            {item.tags.map(tag => (
                                                <Tag key={tag} style={{marginRight: '4px'}}>{tag}</Tag>
                                            ))}
                                        </div>
                                    </div>
                                }
                            />
                        </Card>
                    </List.Item>
                )}
            />
        </div>
    );
};

export default VideoList;