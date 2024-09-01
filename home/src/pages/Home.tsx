import React from 'react';
import { Carousel, Row, Col, Typography, Card } from 'antd';
import { ClockCircleOutlined, HomeOutlined, SafetyCertificateOutlined, DollarOutlined } from '@ant-design/icons';
import './Home.css'; // Add custom styles if needed

const { Title, Paragraph } = Typography;

const deliveryFeatures = [
    { title: "Delivery within 24 Hours", icon: <ClockCircleOutlined /> },
    { title: "Deliver to Doorstep", icon: <HomeOutlined /> },
    { title: "Freshness Guaranteed", icon: <SafetyCertificateOutlined /> },
    { title: "Amazing Deals", icon: <DollarOutlined /> }
];

const Home: React.FC = () => {
    return (

        <div style={{ padding: '0 10px' }}>
            <Title level={1} style={{ textAlign: 'center', margin: '0', color: '#EDF1D6', fontFamily:'Poppins' }}>Welcome to Our Supermarket</Title>

            {/* Slider Section */}
            <Carousel autoplay >
                <div>
                    <img
                        src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Fresh Fruits and Vegetables"
                        style={{ width: '100%', height: '250px', objectFit: 'cover' }}
                    />
                </div>
                <div>
                    <img
                        src="https://plus.unsplash.com/premium_photo-1670002415458-a5b2816bb79c?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Exclusive Discounts"
                        style={{ width: '100%', height: '250px', objectFit: 'cover' }}
                    />
                </div>
                <div>
                    <img
                        src="https://plus.unsplash.com/premium_photo-1663039978847-63f7484bf701?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Quality Groceries"
                        style={{ width: '100%', height: '250px', objectFit: 'cover' }}
                    />
                </div>
            </Carousel>

            {/* Delivery Features Section */}
            <Row gutter={[16, 16]} style={{ margin: '10px 0', justifyContent: 'center' }}>
                {deliveryFeatures.map((feature, index) => (
                    <Col xs={24} sm={12} md={8} lg={6} key={index}>
                        <Card
                            hoverable
                            style={{
                                textAlign: 'center',
                                borderRadius: '10px',
                                background: 'rgba(255, 255, 255, 0.3)', // Glass-like transparency
                                backdropFilter: 'blur(10px)', // Blur background for glass effect
                                padding: '10px',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                            cover={<div style={{ padding: '0', fontSize: '40px', color: '#1BFC06',margin:'0' }}>{feature.icon}</div>}
                        >
                            <Card.Meta title={feature.title} />
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* Attractive Quote Section */}
            <div style={{ textAlign: 'center', margin: '20px 0', padding: '20px', backgroundColor: '#f0f2f5', borderRadius: '10px' }}>
                <Title level={3} style={{margin:'0'}}>"Good Food is Good Mood"</Title>
                <Paragraph>Experience the joy of shopping with us, where quality meets convenience.</Paragraph>
            </div>
        </div>
    );
};

export default Home;
