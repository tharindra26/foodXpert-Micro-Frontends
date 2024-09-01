import React, { useState, useEffect } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHouse,
  faBoxOpen,
  faBox,
  faTruck,
  faMoneyCheckDollar,
  faClipboardCheck,
  faTags,
  faEnvelope,
  faHeadset,
  faMagnifyingGlassLocation
} from '@fortawesome/free-solid-svg-icons';
import type { MenuProps } from 'antd';
import { Button, Menu } from 'antd';
import './Navbar.css';

type MenuItem = Required<MenuProps>['items'][number];

const Navbar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState<string>('1');

  // Toggle collapsed state
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  // Handle menu item click
  const handleMenuClick = (e: { key: string }) => {
    setSelectedKey(e.key);
    sessionStorage.setItem('selectedMenuItem', e.key);
  };

  // Read selected menu item from session storage on mount
  useEffect(() => {
    const savedKey = sessionStorage.getItem('selectedMenuItem');
    if (savedKey) {
      setSelectedKey(savedKey);
    }
  }, []);

  // Menu items
  const items: MenuItem[] = [
    { key: '1', icon: <FontAwesomeIcon icon={faHouse} />, label: <a href="/home">Home</a> },
    { key: '2', icon: <FontAwesomeIcon icon={faBoxOpen} />, label: <a href="/products">Products</a> },
    {
      key: 'order-status',
      icon: <FontAwesomeIcon icon={faBox} />,
      label: 'My Orders',
      children: [
        { key: '9', icon: <FontAwesomeIcon icon={faMoneyCheckDollar} />, label: <a href="/option5">To Pay</a> },
        { key: '10', icon: <FontAwesomeIcon icon={faClipboardCheck} />, label: 'To Ship' },
        { key: '11', icon: <FontAwesomeIcon icon={faTruck} />, label: 'To Receive' },
      ],
    },
    { key: 'promotions', icon: <FontAwesomeIcon icon={faTags} />, label: <a href="/home">Discounts</a> },
    { key: 'messages', icon: <FontAwesomeIcon icon={faEnvelope} />, label: <a href="/home">Messages</a> },
    { key: 'chat', icon: <FontAwesomeIcon icon={faHeadset} />, label: <a href="/home">Chat With Us</a> },
    { key: 'contact', icon: <FontAwesomeIcon icon={faMagnifyingGlassLocation} />, label: <a href="/home">Contact Us</a> },
  ];

  return (
    <div style={{
      width: collapsed ? '80px' : '250px',
      transition: 'width 0.5s',
      padding: '0px 10px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      flex: '1',
      height: '88vh',
      backgroundColor: '#2C3639',
    }}>
      <Menu
        selectedKeys={[selectedKey]}
        defaultOpenKeys={['sub1']}
        mode="inline"
        inlineCollapsed={collapsed}
        className='custom-menu'
        items={items}
        style={{ height: '100%', borderRadius: '10px' }}
        onClick={handleMenuClick} // Handle menu item click
      />
      <Button
        type="primary"
        onClick={toggleCollapsed}
        style={{ marginBottom: 16 }}
        className={collapsed ? 'collapsed-button' : 'expanded-button'}
      >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
    </div>
  );
};

const App: React.FC = () => (
  <div style={{ display: 'flex', width: 'auto', height: '100%' }}>
    <Navbar />
  </div>
);

export default App;
