import React, { useEffect, useState } from 'react';
import { Typography, Row, Col, GetProps, Input } from 'antd';
const { Title } = Typography;
import { List, Card, Spin, Alert } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAppleAlt,      // Fruits & Vegetables
  faCheese,        // Dairy & Eggs
  faDrumstickBite, // Meat & Seafood
  faBreadSlice,    // Bakery & Bread
  faBoxOpen,       // Pantry Staples
  faSnowflake,     // Frozen Foods
  faThLarge        // All Categories
} from '@fortawesome/free-solid-svg-icons';
import { fetchProducts } from '../services/ProductService';
import { Button } from 'antd';
import './ProductsHome.css';

type SearchProps = GetProps<typeof Input.Search>;

const { Search } = Input;

const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);

const formatPrice = (price) => {
  return price.toFixed(2); // Ensures two decimal points
};

const ProductsHome: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        setError('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) return <Spin tip="Loading products..." />;
  if (error) return <Alert message={error} type="error" />;


  const categories = [
    { id: 1, icon: <FontAwesomeIcon icon={faThLarge} />, text: 'All' },
    { id: 2, icon: <FontAwesomeIcon icon={faAppleAlt} />, text: 'Fruits & Vegetables' },
    { id: 3, icon: <FontAwesomeIcon icon={faCheese} />, text: 'Dairy & Eggs' },
    { id: 4, icon: <FontAwesomeIcon icon={faDrumstickBite} />, text: 'Meat & Seafood' },
    { id: 5, icon: <FontAwesomeIcon icon={faBreadSlice} />, text: 'Bakery & Bread' },
    { id: 6, icon: <FontAwesomeIcon icon={faBoxOpen} />, text: 'Pantry Staples' },
    { id: 7, icon: <FontAwesomeIcon icon={faSnowflake} />, text: 'Frozen Foods' },
  ];


  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, width: '100%',  }}>

      <Row className='categories' justify="space-between">
        {categories.map(category => (
          <Col key={category.id} xs={24} sm={8} md={3} lg={3}>
            <div className="category-item" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
              <div style={{ fontSize: '20px', color:'#2C3639' }}>
                {category.icon}
              </div>
              <Title level={5} className="category-text" style={{fontSize:'12px', margin:'0', padding:'0'}}>{category.text}</Title>
            </div>
          </Col>
        ))}
      </Row>

      <Row justify="end">
        <Col >
          <div className="search-bar custom-search ">
            <Search
              placeholder="input search text"
              allowClear
              enterButton="Search"
              size="large"
              style={{ width: '600px' }}
              onSearch={onSearch}
            />
          </div>

        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ width: '100%', marginTop: '10px' }}>
        {
          products.map((product) => (
            <Col xs={24} sm={12} md={8} lg={6} key={product.id}>

              <div style={{
                borderRadius: '8px',
                backgroundColor: 'white',
                display: 'flex',
                flexDirection: 'column',
                height: '250px',
                padding: '16px',
                justifyContent: 'center',
                alignItems: 'center',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              }}>

                <Row className="product-image">
                  <img src={product.productImagePath} alt={product.productName} className="image" />
                </Row>
                <Row className="procust-name">
                  <Title level={5} style={{ margin: '0', padding: '0', fontSize: '16px', fontFamily: 'Arial, sans-serif', opacity: 0.8 }}>{product.productName}</Title>
                </Row>
                <div className="unit-type">
                  <Title level={5} style={{ margin: '0', padding: '0', fontSize: '14px', fontFamily: 'Arial, sans-serif', opacity: 0.4 }}>Per 1 unit(s)</Title>
                </div>
                <Row className="product-price">
                  <Title level={5} style={{ margin: '0', padding: '0', fontSize: '20px', fontFamily: 'Arial, sans-serif', opacity: 1.0 }}>Rs {formatPrice(product.productPricePerUnit)}</Title>
                </Row>
                <Row className="add-button">
                  <Button
                    size={'large'}
                    style={{
                      width: '200px',        // Change the width
                      height: '30px',        // Change the height
                      backgroundColor: '#A27B5C', // Change the background color
                      color: 'white',       // Change the text color
                      border: 'none',       // Remove border
                      borderRadius: '4px',  // Optional: rounded corners
                      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Optional: add shadow
                      marginTop: '10px',    // Optional: add top margin
                    }}
                  >ADD TO CART
                  </Button>
                </Row>

              </div>
            </Col>
          ))
        }
      </Row>
    </div>
  );
};

export default ProductsHome;
