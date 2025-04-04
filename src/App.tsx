import React, {useState} from 'react';
import {Layout, Nav} from '@douyinfe/semi-ui';
import {IconUser, IconVideoListStroked, IconEdit} from '@douyinfe/semi-icons';
import {Link, Outlet} from 'react-router-dom';
import {NavItemProps} from '@douyinfe/semi-ui/lib/es/navigation';
import './App.css';

const navItems: NavItemProps[] = [
    {
        itemKey: 'profile',
        text: '个人中心',
        icon: <IconUser size="large"/>,
        link: '/profile'
    },
    {
        itemKey: 'videos',
        text: '视频列表',
        icon: <IconVideoListStroked size="large"/>,
        link: '/videos'
    },
    {
        itemKey: 'script-generator',
        text: '脚本生成',
        icon: <IconEdit size="large"/>,
        link: '/script-generator'
    },
];

const App: React.FC = () => {
    const {Sider, Content} = Layout;
    const [selectedKeys, setSelectedKeys] = useState(['profile']);

    return (
        <Layout style={{height: '100vh'}}>
            <Sider style={{backgroundColor: '#001529'}}>
                <Nav
                    style={{height: '100%'}}
                    defaultSelectedKeys={selectedKeys}
                    items={navItems}
                    onSelect={({itemKey}) => setSelectedKeys([String(itemKey)])}
                    renderWrapper={({itemElement, props}) => (
                        <Link to={(props as NavItemProps).link ?? ""}>{itemElement}</Link>
                    )}
                />
            </Sider>
            <Content style={{padding: '24px', overflowY: 'auto'}}>
                <Outlet/>
            </Content>
        </Layout>
    );
};

export default App;
