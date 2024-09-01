import React from 'react';
import { Form, Input, Button, Typography, Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const { Title } = Typography;

const Login: React.FC = () => {
  const { handleLogin, loading, error } = useAuth();

  const onFinish = (values: { email: string; password: string }) => {
    const { email, password } = values;
    handleLogin({ email, password });
  };

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh', 
      width: '100vw',
      background: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://images7.alphacoders.com/127/thumb-1920-1274685.jpg) no-repeat center center fixed', 
      backgroundSize: 'cover'
    }}>
      <div style={{ 
        background: 'rgba(255, 255, 255, 0.8)', 
        padding: '24px', 
        borderRadius: '12px', 
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)', 
        width: '100%', 
        maxWidth: '400px' 
      }}>
        <Title level={2} style={{ textAlign: 'center' }}>Login</Title>
        <Form
          name="login"
          onFinish={onFinish}
          layout="vertical"
        >
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

          {error && <div style={{ color: 'red', marginBottom: '16px' }}>{error}</div>}

          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              style={{ width: '100%', borderRadius: '8px', backgroundColor:'#059212', color:'white', fontFamily:'Poppins' }} 
              loading={loading}
            >
              Login
            </Button>
          </Form.Item>

          <Form.Item>
            <Row justify="center">
              <Col>
                <Link to="/home">Home</Link>
              </Col>
              <Col style={{ marginLeft: '16px' }}>
                <Link to="/signup">Sign Up</Link>
              </Col>
            </Row>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
