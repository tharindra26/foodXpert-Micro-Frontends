import React, { useEffect, useState } from 'react';
import { Typography, Row, Col, GetProps, Input } from 'antd';
const { Title } = Typography;
import { List, Card, Spin, Alert } from 'antd';
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
    { id: 1, image: 'https://objectstorage.ap-mumbai-1.oraclecloud.com/n/softlogicbicloud/b/cdn/o/products/350001--01--1686065805.webp', text: 'Category 1' },
    { id: 2, image: 'https://objectstorage.ap-mumbai-1.oraclecloud.com/n/softlogicbicloud/b/cdn/o/products/340284--01--1623338896.webp', text: 'Category 2' },
    { id: 3, image: 'https://objectstorage.ap-mumbai-1.oraclecloud.com/n/softlogicbicloud/b/cdn/o/products/320010--01--1549602291.webp', text: 'Category 3' },
    { id: 4, image: 'https://objectstorage.ap-mumbai-1.oraclecloud.com/n/softlogicbicloud/b/cdn/o/products/123644--01--1702306088.webp', text: 'Category 4' },
    { id: 5, image: 'https://objectstorage.ap-mumbai-1.oraclecloud.com/n/softlogicbicloud/b/cdn/o/products/310010--01--1555692008.webp', text: 'Category 5' },
    { id: 5, image: 'https://objectstorage.ap-mumbai-1.oraclecloud.com/n/softlogicbicloud/b/cdn/o/products/118370--01--1613330068.webp', text: 'Category 5' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, padding: '0px', width: '100%' }}>

      <Row className='categories' justify="center">
        {categories.map(category => (
          <Col key={category.id} xs={24} sm={8} md={4} lg={4} style={{ padding: '8px' }}>
            <div className="category-item">
              <img src={category.image} alt={category.text} className="category-image" />
              <Title level={5} className="category-text">{category.text}</Title>
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
