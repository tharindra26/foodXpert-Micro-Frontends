import React, { useState } from 'react';
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHouse,
  faBoxOpen,
  faShoppingCart,
  faPlus,
  faBasketShopping,
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

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const items: MenuItem[] = [
    { key: '1', icon: <FontAwesomeIcon icon={faHouse} />, label: <a href="/home">Home</a> },
    { key: '2', icon: <FontAwesomeIcon icon={faBoxOpen} />, label: <a href="/products">Foods</a> },
    {
      key: 'cart-sub',
      icon: <FontAwesomeIcon icon={faShoppingCart} />,
      label: 'Cart',
      children: [
        { key: '5', icon: <FontAwesomeIcon icon={faPlus} />, label: <a href="/option5">New Cart</a> },
        { key: '6', icon: <FontAwesomeIcon icon={faBasketShopping} />, label: <a href="/option6">Cart 1</a> },
        { key: '7', icon: <FontAwesomeIcon icon={faBasketShopping} />, label: <a href="/option7">Cart 2</a> },
        { key: '8', icon: <FontAwesomeIcon icon={faBasketShopping} />, label: <a href="/option8">Cart 3</a> },
      ],
    },
    {
      key: 'order-status',
      icon: <FontAwesomeIcon icon={faBox} />,
      label: 'My Orders',
      children: [
        { key: '9', icon: <FontAwesomeIcon icon={faMoneyCheckDollar} />, label: <a href="/option5">To Pay</a> },
        { key: '10', icon: <FontAwesomeIcon icon={faClipboardCheck} />, label: 'To Ship' },
        { key: '11', icon: <FontAwesomeIcon icon={faTruck} />, label: 'To Recieve' },
      ],
    },
    { key: 'promotions', icon: <FontAwesomeIcon icon={faTags} />, label: <a href="/home">Discounts</a> },
    { key: 'messages', icon: <FontAwesomeIcon icon={faEnvelope} />, label: <a href="/home">Messages</a> },
    { key: 'messages', icon: <FontAwesomeIcon icon={faHeadset} />, label: <a href="/home">Chat With Us</a> },
    { key: 'messages', icon: <FontAwesomeIcon icon={faMagnifyingGlassLocation} />, label: <a href="/home">Contact Us</a> },

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
      height: '100%',
      backgroundColor: '#ffffff'
    }}>
      <Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        inlineCollapsed={collapsed}
        className='custom-menu'
        items={items}
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
