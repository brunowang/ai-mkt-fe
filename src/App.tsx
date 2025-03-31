import React, {useState} from 'react';
import {Layout, Nav} from '@douyinfe/semi-ui';
import {IconUser, IconVideoListStroked} from '@douyinfe/semi-icons';
import {BrowserRouter as Router, Routes, Route, Link, Navigate} from 'react-router-dom';
import Profile from './pages/Profile';
import VideoList from './pages/VideoList';
import './App.css';

const App: React.FC = () => {
    const {Sider, Content} = Layout;
    const [selectedKeys, setSelectedKeys] = useState(['profile']);

    const handleSelect = (data: { itemKey: string | number; }) => {
        setSelectedKeys([String(data.itemKey)]);
    };

    return (
        <Router>
            <Layout style={{height: '100vh'}}>
                <Sider style={{backgroundColor: '#001529'}}>
                    <Nav
                        style={{height: '100%'}}
                        defaultSelectedKeys={selectedKeys}
                        items={[
                            {itemKey: 'profile', text: '个人中心', icon: <IconUser size="large"/>, link: '/profile'},
                            {
                                itemKey: 'videos',
                                text: '视频列表',
                                icon: <IconVideoListStroked size="large"/>,
                                link: '/videos'
                            }
                        ]}
                        onSelect={handleSelect}
                        renderWrapper={({itemElement, props}) => {
                            return (
                                <Link to={props.link}>
                                    {itemElement}
                                </Link>
                            );
                        }}
                    />
                </Sider>
                <Content style={{padding: '24px', overflowY: 'auto'}}>
                    <Routes>
                        <Route path="/profile" element={<Profile/>}/>
                        <Route path="/videos" element={<VideoList/>}/>
                        <Route path="/" element={<Navigate to="/profile"/>}/>
                    </Routes>
                </Content>
            </Layout>
        </Router>
    );
};

export default App;
