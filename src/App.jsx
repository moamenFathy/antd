import React, { useState, useEffect } from 'react';
import logo from './assets/logo.png';
import {
  HomeOutlined,
  UsergroupAddOutlined,
  PieChartOutlined,
  UserOutlined,
  DownOutlined
} from '@ant-design/icons';
import { RiMenu5Line, RiLogoutBoxRLine, RiArrowDownSLine, RiCloseLargeLine } from '@remixicon/react';
import { Button, ConfigProvider, Layout, Menu, theme, Avatar, Dropdown, Space, Badge, Drawer, Flex, Grid } from 'antd';

const { Header, Sider, Content } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);       // Desktop collapse
  const [mobileVisible, setMobileVisible] = useState(false); // Mobile Drawer
  const [dropDown, setDropDown] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken();

  const items = [{ label: <a style={{ color: "#7A180E" }}>تسجيل الخروج</a>, icon: <RiLogoutBoxRLine color='#7A180E' /> }];

  const menuItems = [
    {
      key: '1',
      icon: <HomeOutlined style={{ fontSize: 18 }} />,
      label: 'الرئيسية',
      style: {
        borderBottom: '1px solid lightgrey',
        fontSize: 12,
        paddingTop: 8,   // increase top padding
        paddingBottom: 8 // increase bottom padding
      }
    }
    ,
    {
      key: '2',
      icon: <UsergroupAddOutlined style={{ fontSize: 18 }} />,
      label: 'وحدة بيانات المستخدمين',
      style: { borderBottom: '1px solid lightgrey', fontSize: 12, paddingTop: 2, paddingBottom: 2 },
      children: [
        {
          key: "4",
          label: "nav2 -> 1",
        },
        {
          key: "5",
          label: "nav2 -> 2",
        },
        {
          key: "6",
          label: "nav2 -> 3",
        },
      ]
    },
    {
      key: '3',
      icon: <PieChartOutlined style={{ fontSize: 18 }} />,
      label: 'وحدة التقارير و الإحصائيات',
      style: { borderBottom: '1px solid lightgrey', fontSize: 12 },

      children: [
        {
          key: "7",
          label: "nav3 -> 1",
        },
        {
          key: "8",
          label: "nav3 -> 2",
        },
        {
          key: "9",
          label: "nav3 -> 3",
        },
      ]
    },
  ];

  // Track window size for responsiveness
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth <= 768;

  return (
    <ConfigProvider direction='rtl'>
      <Layout style={{ minHeight: "100vh" }}>
        {/* Desktop Sider - Fixed on the right side for RTL */}
        {!isMobile && (
          <Sider

            style={{
              position: 'fixed',
              height: '100vh',
              right: 0, // Changed from left to right for RTL
              top: 0,
              bottom: 0,
              boxShadow: "5px 5px 5px rgba(0, 0, 0, 0.3)",
            }}
            theme='light'
            trigger={null}
            collapsible
            collapsed={collapsed}
            reverseArrow={true}
            width={250}
          >
            <div style={{
              height: '64px',
              display: 'flex',
              alignItems: 'center',
              padding: '0 16px',
              borderBottom: '1px solid #f0f0f0' // Add border to logo area
            }}>
              <img src={logo} width='40' alt='logo' />
            </div>
            <Menu
              theme="light"
              mode="inline"
              multiple={false}
              defaultSelectedKeys={["1"]}
              items={menuItems}
              style={{ borderRight: 0 }} // Remove default menu border
            />
          </Sider>
        )}

        {/* Mobile Drawer */}
        {isMobile && (
          <Drawer
            closable
            closeIcon={<RiCloseLargeLine color='black' />}
            placement="right"
            onClose={() => setMobileVisible(false)}
            open={mobileVisible}
            destroyOnHidden
            bodyStyle={{ padding: 0 }}
            headerStyle={{ display: "none" }}
            maskClosable
            mask={false}
            width={250}
            styles={{ display: "none" }}
            zIndex={1}
            style={{ marginTop: "65px" }}
          >
            <Menu
              theme="light"
              mode="inline"
              multiple={false}
              defaultSelectedKeys={["1"]}
              items={menuItems.map(item => ({
                ...item,
                style: { ...item.style, borderBottom: '1px solid #f0f0f0' }
              }))}
              onClick={() => setMobileVisible(false)}
              style={{ borderRight: 0 }} // Remove default menu border
            />
          </Drawer>
        )}

        {/* Main Layout - Adjusted margin for RTL sidebar */}
        <Layout style={{
          marginRight: !isMobile && !collapsed ? '250px' : !isMobile && collapsed ? '80px' : '0',
          transition: 'margin-right 0.2s',
          marginLeft: '0 !important'
        }}>
          <Header
            style={{
              padding: '0 16px',
              background: colorBgContainer,
              position: "fixed",
              width: "100%",
              zIndex: 1000, // Higher than drawer
              boxShadow: "1px 1px 20px rgba(0, 0, 0, 0.3)",
              right: 0, // Changed from left to right for RTL
            }}
          >
            <Flex align='center' justify='space-between'>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Button
                  type="text"
                  onClick={() => isMobile ? setMobileVisible(!mobileVisible) : setCollapsed(!collapsed)}
                  style={{
                    fontSize: '22px',
                    width: 44,
                    height: 44,
                    padding: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                  icon={<RiMenu5Line />}
                />
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {/* Logo is always visible in navbar */}
                  <img src={logo} width={isMobile ? '70' : '80'} alt='logo' style={{ display: 'block' }} />
                  {!isMobile && (
                    <span style={{ fontSize: '16px', fontWeight: '600', color: '#000' }}>
                      القيادة العامة لشرطة الفجيرة
                    </span>
                  )}
                </div>
              </div>

              <Flex align='center' gap="12px" style={{ marginBottom: "10px" }}>
                <Badge dot offset={[7, 47]} color='red'>
                  <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} size={40} />
                </Badge>
                {!isMobile && (
                  <Dropdown menu={{ items }} trigger={['click']} onOpenChange={(open) => setDropDown(open)}>
                    <a onClick={e => e.preventDefault()} style={{ color: "black" }}>
                      <Space style={{ marginInline: "10px", display: "flex", alignItems: "center" }}>
                        <Flex align='center' gap="small">
                          Super Admin
                          <RiArrowDownSLine style={{ transform: dropDown ? "rotate(180deg)" : "rotate(0deg)", transition: "all 0.3s ease" }} size={15} color='#7A180E' />
                        </Flex>
                      </Space>
                    </a>
                  </Dropdown>
                )}
              </Flex>
            </Flex>
          </Header>

          <Content
            style={{
              margin: isMobile ? '100px 8px 16px 8px' : '80px 16px 16px 16px',
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            Content
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider >
  );
};

export default App;