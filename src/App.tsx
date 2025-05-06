import React, {useState} from 'react';
import {Layout, Nav} from '@douyinfe/semi-ui';
import {IconVideoListStroked} from '@douyinfe/semi-icons';
import {Link, Outlet} from 'react-router-dom';
import {NavItemProps} from '@douyinfe/semi-ui/lib/es/navigation';
import './App.css';

const navItems: NavItemProps[] = [
    {
        itemKey: 'plans',
        text: '计划列表',
        icon: <IconVideoListStroked size="large"/>,
        link: '/plans'
    },
];

const App: React.FC = () => {
    const {Sider, Content} = Layout;
    const [selectedKeys, setSelectedKeys] = useState(['plans']);

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
