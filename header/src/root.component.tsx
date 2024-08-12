import Logo from "./components/logo/Logo";
import './Header.css';
import { Button, Col, Row } from 'antd';
import type { MenuProps } from 'antd';
import { Avatar, Dropdown } from 'antd';
import { UserOutlined, ShoppingCartOutlined, LoginOutlined, UserAddOutlined } from '@ant-design/icons';
import { Typography } from 'antd';
import { useState, useEffect } from "react";
import Link from "antd/es/typography/Link";


const { Title } = Typography;


export default function Root(props) {

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    // Simulate checking for session token
    const token = localStorage.getItem('authToken'); // Replace with your token check logic
    setIsAuthenticated(!!token);
  }, []);


  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
          1st menu item
        </a>
      ),
    },
    {
      key: '2',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
          2nd menu item (disabled)
        </a>
      ),
      disabled: true,
    },
    {
      key: '3',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
          3rd menu item (disabled)
        </a>
      ),
      disabled: true,
    },
    {
      key: '4',
      danger: true,
      label: 'a danger item',
    },
  ];

  return (
    <>
      <Row className="header-bar" wrap={false}>
        <Col>
          <div className="logo">
            <Logo />
          </div>
        </Col>

        <Col >
          <Title level={4} className="welcome-text">Welcome back, Tharindra</Title>
        </Col>

        <Col>
          {isAuthenticated ? (
            <div className="header-actions" style={{ display: 'flex', alignItems: 'center' }}>
              <Button type="primary" icon={<ShoppingCartOutlined />} style={{ marginRight: '10px' }}>
                Cart
              </Button>
              <Dropdown menu={{ items }} placement="bottomLeft">
                <Avatar shape="square" size={48} icon={<UserOutlined />} />
              </Dropdown>
            </div>
          ) : (
            <div className="header-actions" style={{ display: 'flex', alignItems: 'center' }}>
              <Button type="primary" icon={<ShoppingCartOutlined />} style={{ marginRight: '10px' }}>
                Cart
              </Button>
              <Button type="default" icon={<LoginOutlined />} style={{ marginRight: '10px' }}>
                Sign In
              </Button>
              <Button type="default" icon={<UserAddOutlined />}>
                <a href="/signup">Sign In</a>
              </Button>
            </div>
          )}
        </Col>

      </Row>
    </>
  );
}
