import React, { useState, useEffect } from 'react';
import Logo from "./components/logo/Logo";
import './Header.css';
import { Button, Col, Row, Typography, Dropdown, Avatar, notification, Badge, Menu, Modal, Input } from 'antd';
import { UserOutlined, ShoppingCartOutlined, LoginOutlined, UserAddOutlined, LogoutOutlined, PlusOutlined } from '@ant-design/icons';
import { fetchCarts, createCart } from './api/cartService'; // Adjust the import path as needed

const { Title } = Typography;

interface CartItem {
  id: number;
  productId: string;
  quantity: number;
}

interface Cart {
  id: number;
  userEmail: string;
  cartName: string;
  items: CartItem[];
  checkedOut: boolean;
}

export default function Root() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [carts, setCarts] = useState<Cart[]>([]);
  const [selectedCart, setSelectedCart] = useState<Cart | null>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [newCartName, setNewCartName] = useState<string>('');

  useEffect(() => {
    const token = sessionStorage.getItem('authToken');
    const user = JSON.parse(sessionStorage.getItem('user') || '{}');
    const email = user.email;
    setIsAuthenticated(!!token);
    setUserEmail(email);

    if (token && email) {
      fetchCartsData(email);

      const savedCartId = sessionStorage.getItem('selectedCartId');
      if (savedCartId) {
        const savedCart = carts.find(cart => cart.id.toString() === savedCartId);
        if (savedCart) {
          setSelectedCart(savedCart);
        }
      }
    }
  }, []);

  const fetchCartsData = async (userEmail: string) => {
    try {
      const response = await fetchCarts(userEmail);
      setCarts(response.data);
      if (response.data.length > 0) {
        setSelectedCart(response.data[0]);
      }
    } catch (error) {
      console.error('Error fetching carts:', error);
      notification.error({ message: 'Failed to fetch carts' });
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('selectedMenuItem');
    sessionStorage.removeItem('selectedCartId');
    setIsAuthenticated(false);
    setUserEmail(null);
    setCarts([]);
    setSelectedCart(null);
    window.location.href = '/home';
  };

  const handleCartChange = (cart: Cart) => {
    setSelectedCart(cart);
    sessionStorage.setItem('selectedCartId', cart.id.toString());
    notification.info({
      message: 'Cart Changed',
      description: `You have selected the cart: ${cart.cartName}.`,
      duration: 2,
    });
  };

  const handleCreateCart = async () => {
    if (userEmail) {
      try {
        const response = await createCart(userEmail, newCartName);
        const newCart = response.data;
  
        // Update carts and set the newly created cart as the selected cart
        setCarts([...carts, newCart]);
        setSelectedCart(newCart);
  
        // Set the new cart's ID in session storage
        sessionStorage.setItem('selectedCartId', newCart.id.toString());
  
        // Clear the modal input and close the modal
        setNewCartName('');
        setIsModalVisible(false);
  
        // Notify the user that the cart has been created and selected
        notification.success({
          message: 'Cart Created',
          description: `Cart "${newCart.cartName}" has been created and selected.`,
          duration: 2,
        });
      } catch (error) {
        console.error('Error creating cart:', error);
        notification.error({ message: 'Failed to create cart' });
      }
    }
  };
  

  const cartMenuItems = [
    ...carts.map(cart => ({
      key: cart.id.toString(),
      label: (
        <a style={{ display: 'flex', alignItems: 'center' }} onClick={() => handleCartChange(cart)}>
          {cart.cartName}
          <Badge count={cart.items ? cart.items.length : 0} style={{ marginLeft: '10px' }} />
        </a>
      ),
    })),
    {
      key: 'create',
      icon: <PlusOutlined />,
      label: 'Create New Cart',
      onClick: () => setIsModalVisible(true),
    }
  ];

  const menuItems = [
    {
      key: 'profile',
      label: <a href="/profile">My Profile</a>,
    },
    {
      key: 'logout',
      danger: true,
      label: (
        <a onClick={handleLogout} style={{ display: 'flex', alignItems: 'center' }}>
          <LogoutOutlined style={{ marginRight: '8px' }} />
          Logout
        </a>
      ),
    },
  ];

  const cartClick = () => {
    // Retrieve cart ID from sessionStorage
    const selectedCartId = sessionStorage.getItem('selectedCartId');

    if (selectedCartId) {
      // Navigate to the cart details page
      window.location.href = `/cart/${selectedCartId}`;
    } else {
      // Show notification if no cart ID is found
      notification.warning({
        message: 'No Cart Selected',
        description: 'Please select a cart before proceeding.',
        duration: 2,
      });
    }
  }

  return (
    <>
      <Row className="header-bar" wrap={false} style={{ alignItems: 'center' }}>
        <Col>
          <div className="logo">
            <Logo />
          </div>
        </Col>

        <Col>
          {isAuthenticated ? (
            <div className="header-actions" style={{ display: 'flex', alignItems: 'center' }}>
              <Dropdown.Button
                onClick={() => cartClick()}
                style={{
                  flex: '1',
                  marginRight: '40px',
                  borderRadius: '4px'
                }} menu={{ items: cartMenuItems }} icon={<ShoppingCartOutlined />} >
                {selectedCart ? `Cart: ${selectedCart.cartName}` : 'Select Cart'}
              </Dropdown.Button>
              <Title level={5} style={{ margin: '0 10px 0 0', padding: '0', color: 'white', fontFamily: 'Poppins, sans-serif', fontWeight: 200, fontSize: '14px' }}>
                {userEmail}
              </Title>
              <Dropdown menu={{ items: menuItems }} placement="bottomLeft">
                <Avatar shape="square" size={48} icon={<UserOutlined />} style={{ backgroundColor: 'white', color: 'black' }} />
              </Dropdown>
            </div>
          ) : (
            <div className="header-actions" style={{ display: 'flex', alignItems: 'center' }}>
              <a href="/signup">
                <Button type="default" icon={<UserAddOutlined />} style={{ marginRight: '10px', backgroundColor: '#059212', color: 'white' }}>
                  Register
                </Button>
              </a>
              <a href="/login">
                <Button type="default" icon={<LoginOutlined />}>
                  Login
                </Button>
              </a>
            </div>
          )}
        </Col>
      </Row>

      <Modal
        title="Create New Cart"
        open={isModalVisible}
        onOk={handleCreateCart}
        onCancel={() => setIsModalVisible(false)}
        okText="Create"
        cancelText="Cancel"
      >
        <Input
          placeholder="Enter cart name"
          value={newCartName}
          onChange={(e) => setNewCartName(e.target.value)}
        />
      </Modal>
    </>
  );
}
