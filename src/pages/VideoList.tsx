import React from 'react';
import {Typography, Card, List, Avatar, Tag, Space} from '@douyinfe/semi-ui';
import {IconLikeThumb, IconComment} from '@douyinfe/semi-icons';

const VideoList: React.FC = () => {
    const {Title} = Typography;

    // 模拟视频数据
    const videoList = [
        {
            id: 1,
            title: '如何使用React和Semi Design构建现代化UI',
            cover: 'https://sf6-cdn-tos.douyinstatic.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/avatarDemo.jpeg',
            author: 'Bruno Wang',
            duration: '15:32',
            views: '2.5万',
            likes: 326,
            comments: 42,
            time: '2024-05-01',
            tags: ['React', 'Semi UI', '前端开发']
        },
        {
            id: 2,
            title: '前端工程化实践 - 从零搭建React开发环境',
            cover: 'https://sf6-cdn-tos.douyinstatic.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/avatarDemo.jpeg',
            author: 'Bruno Wang',
            duration: '23:17',
            views: '1.8万',
            likes: 258,
            comments: 36,
            time: '2024-04-25',
            tags: ['工程化', 'Webpack', 'Vite']
        },
        {
            id: 3,
            title: 'React Hooks深入解析',
            cover: 'https://sf6-cdn-tos.douyinstatic.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/avatarDemo.jpeg',
            author: 'Bruno Wang',
            duration: '18:45',
            views: '3.2万',
            likes: 476,
            comments: 58,
            time: '2024-04-15',
            tags: ['React', 'Hooks', '状态管理']
        }
    ];

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