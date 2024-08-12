import React from 'react';
import { Form, Input, Button, Typography, Space } from 'antd';
import { Link } from 'react-router-dom';

const { Title } = Typography;

const SignUp: React.FC = () => {
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100%', 
      width: '100%',
      background: 'url(https://images7.alphacoders.com/127/thumb-1920-1274685.jpg) no-repeat center center fixed', 
      backgroundSize: 'cover'
    }}>
      <div style={{ 
        background: 'white', 
        padding: '24px', 
        borderRadius: '8px', 
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)', 
        width: '400px' 
      }}>
        <Title level={2} style={{ textAlign: 'center' }}>Register</Title>
        <Form
          name="register"
          onFinish={onFinish}
          initialValues={{ remember: true }}
          layout="vertical"
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please input your name!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: 'Please input your email!' }, { type: 'email', message: 'The input is not valid E-mail!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: 'Please input your password!' }]}
            hasFeedback
          >
            <Input.Password />
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
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              Register
            </Button>
          </Form.Item>

          <Form.Item>
            <Space direction="vertical" style={{ width: '100%' }}>
              <Link to="/home">Home</Link>
              <Link to="/login">Login</Link>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default SignUp;
