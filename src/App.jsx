import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
  UsergroupAddOutlined,
  PieChartOutlined,
  UserOutlined,
  DownOutlined
} from '@ant-design/icons';
import { Button, ConfigProvider, Flex, Layout, Menu, theme, Avatar, Dropdown, Space, Badge } from 'antd';
const { Header, Sider, Content } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const items = [{
    label: (<a>hi</a>)
  }]

  const menuItems = [
    {
      key: '1',
      icon: <HomeOutlined />,
      label: 'nav 1',
    },
    {
      key: '2',
      icon: <UsergroupAddOutlined />,
      label: 'nav 2',
      children: [
        { key: "4", label: "nav2 -> 1" },
        { key: "5", label: "nav2 -> 2" },
        { key: "6", label: "nav2 -> 3" },
      ]
    },
    {
      key: '3',
      icon: <PieChartOutlined />,
      label: 'nav 3',
      children: [
        { key: "7", label: "nav3 -> 1" },
        { key: "8", label: "nav3 -> 2" },
        { key: "9", label: "nav3 -> 3" },
      ]
    },
  ]

  return (
    <ConfigProvider direction='rtl'>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider style={{ marginTop: "64px", boxShadow: "5px 5px 5px rgba(0, 0, 0, 0.3)" }} theme='light' trigger={null} collapsible collapsed={collapsed} reverseArrow={true} width={250}>
          <div className="demo-logo-vertical" />
          <Menu
            theme="light"
            mode="inline"
            multiple={false}
            defaultSelectedKeys={["1"]}
            items={menuItems}
          />
        </Sider>
        <Header style={{ padding: 0, background: colorBgContainer, position: "fixed", width: "100%", zIndex: 1000, boxShadow: "1px 1px 20px rgba(0, 0, 0, 0.3)" }}>
          <Flex justify='space-between' style={{ marginInline: "30px" }}>
            <div>
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  fontSize: '16px',
                  width: 64,
                  height: 64,
                }}
              />
              <img alt='logo' />
            </div>
            <div>
              <Badge dot offset={[5, 48]} color='red'>
                <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
              </Badge>
              <Dropdown menu={{ items }} trigger={['click']} onOpenChange={(open) => setDropDown(open)}>
                <a onClick={e => e.preventDefault()} style={{ color: "black" }}>
                  <Space style={{ marginInline: "10px" }}>
                    Super Admin
                    <DownOutlined style={{ fontSize: 10, transition: "all 0.3 ease" }} rotate={dropDown ? 180 : 0} />
                  </Space>
                </a>
              </Dropdown>
            </div>
          </Flex>
        </Header>
        <Content
          style={{
            margin: '80px 16px 16px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          Content
        </Content>
      </Layout>
    </ConfigProvider>
  );
};
export default App;