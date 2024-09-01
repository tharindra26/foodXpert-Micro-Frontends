import React from 'react';
import { Form, Input, Button, Typography, Space, Col, Row } from 'antd';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const { Title } = Typography;

const SignUp: React.FC = () => {
  const { handleSignUp, loading, error } = useAuth();

  const onFinish = (values: { name: string; email: string; password: string; confirm: string }) => {
    const { name, email, password } = values;
    handleSignUp({
      name, email, password
    });
  };

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh', 
      width: '100vw',
      position: 'relative',  // Added to enable the overlay
      background: 'url(https://images7.alphacoders.com/127/thumb-1920-1274685.jpg) no-repeat center center fixed', 
      backgroundSize: 'cover'
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Black overlay with 50% opacity
      }}></div>

      <div style={{ 
        zIndex: 1,  // Ensure content is above the overlay
        background: 'rgba(255, 255, 255, 0.8)', 
        padding: '24px', 
        borderRadius: '12px', 
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)', 
        width: '100%', 
        maxWidth: '400px' 
      }}>
        <Title level={2} style={{ textAlign: 'center' }}>Register</Title>
        <Form
          name="register"
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please input your name!' }]}
          >
            <Input 
              style={{ 
                backgroundColor: 'transparent', 
                borderRadius: '8px', 
                borderColor: 'white', 
                color: 'black' 
              }} 
            />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Please input your email!' }, 
              { type: 'email', message: 'The input is not valid E-mail!' }
            ]}
          >
            <Input 
              style={{ 
                backgroundColor: 'transparent', 
                borderRadius: '8px', 
                borderColor: 'white', 
                color: 'black' 
              }} 
            />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: 'Please input your password!' }]}
            hasFeedback
          >
            <Input.Password 
              style={{ 
                backgroundColor: 'transparent', 
                borderRadius: '8px', 
                borderColor: 'white', 
                color: 'black' 
              }} 
            />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={['password']}
            hasFeedback
            rules={[
              { required: true, message: 'Please confirm your password!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The two passwords that you entered do not match!'));
                },
              }),
            ]}
          >
            <Input.Password 
              style={{ 
                backgroundColor: 'transparent', 
                borderRadius: '8px', 
                borderColor: 'white', 
                color: 'black' 
              }} 
            />
          </Form.Item>

          {error && <div style={{ color: 'red', marginBottom: '16px' }}>{error}</div>}

          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              style={{ width: '100%', borderRadius: '8px',backgroundColor:'#059212', color:'white', fontFamily:'Poppins' }} 
              loading={loading}
            >
              Register
            </Button>
          </Form.Item>

          <Form.Item>
            <Row justify="center">
              <Col>
                <Link to="/home">Home</Link>
              </Col>
              <Col style={{ marginLeft: '16px' }}>
                <Link to="/login">Login</Link>
              </Col>
            </Row>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default SignUp;
