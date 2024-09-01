import React, { useEffect, useState } from 'react';
import { Typography, Row, Col, Input, Spin, Alert, Button, Modal, InputNumber, notification } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAppleAlt, faCheese, faDrumstickBite, faBreadSlice, faBoxOpen, faSnowflake, faThLarge } from '@fortawesome/free-solid-svg-icons';
import './ProductsHome.css';
import { getAllProducts } from '../api/productService'; // Import the service
import { addItemToCart } from '../api/cartService'; // Import the service

const { Title } = Typography;
const { Search } = Input;

const ProductsHome: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await getAllProducts(); // Fetch products using the service
        setProducts(response.data); // Update the state with fetched products
      } catch (err) {
        setError('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const handleAddToCart = (product: any) => {
    const authToken = sessionStorage.getItem('authToken');
    const selectedCartId = sessionStorage.getItem('selectedCartId');

    if (!authToken) {
      Modal.info({
        title: 'Login Required',
        content: (
          <div>
            <p>Please log in to add items to your cart.</p>
          </div>
        ),
        onOk: () => {
          window.location.href = '/login'; // Redirect to login page
        },
      });
      return;
    }

    if (!selectedCartId) {
      Modal.info({
        title: 'Cart Required',
        content: (
          <div>
            <p>Please select a cart to add items to.</p>
          </div>
        ),
        onOk: () => {
          window.location.href = '/select-cart'; // Redirect to cart selection page
        },
      });
      return;
    }

    setSelectedProduct(product);
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    if (quantity <= 0) {
      notification.error({
        message: 'Invalid Quantity',
        description: 'Quantity must be greater than 0.',
      });
      return;
    }

    try {
      const selectedCartId = Number(sessionStorage.getItem('selectedCartId'));


      if (!selectedCartId) {
        notification.error({
          message: 'No Cart Selected',
          description: 'Please select a cart before adding items.',
        });
        return;
      }

      const response = await addItemToCart({
        cartId: selectedCartId,
        productId: selectedProduct.id,
        quantity: quantity
      });

      if (response.data.success) {
        notification.success({
          message: 'Item Added',
          description: `${selectedProduct.productName} has been added to your cart.`,
        });
      } else {
        notification.error({
          message: 'Error',
          description: response.data.message || 'Failed to add item to cart.',
        });
      }
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to add item to cart.',
      });
    } finally {
      setIsModalVisible(false);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spin indicator={<LoadingOutlined style={{ fontSize: 60, color: '#1BFC06' }} spin />} />
      </div>
    );
  }

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

  const formatPrice = (price: number) => {
    return price.toFixed(2); // Ensures two decimal points
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, width: 'auto', padding: '20px' }}>
      <Row className='categories' justify="space-between">
        {categories.map(category => (
          <Col key={category.id} xs={24} sm={8} md={3} lg={3}>
            <div className="category-item" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
              <div style={{ fontSize: '20px', color: '#2C3639' }}>
                {category.icon}
              </div>
              <Title level={5} className="category-text" style={{ fontSize: '12px', margin: '0', padding: '0' }}>{category.text}</Title>
            </div>
          </Col>
        ))}
      </Row>

      <Row justify="end">
        <Col >
          <div className="search-bar custom-search">
            <Search
              placeholder="input search text"
              allowClear
              enterButton="Search"
              size="large"
              style={{ width: '600px' }}
              onSearch={(value) => console.log('Search:', value)}
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
                backgroundColor: 'rgba(255, 255, 255, 0.5)', // Set background with transparency
                display: 'flex',
                flexDirection: 'column',
                height: '250px',
                padding: '16px',
                justifyContent: 'center',
                alignItems: 'center',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                backdropFilter: 'blur(10px)', // Optional: to give it a glass effect
              }}>
                <Row className="product-image">
                  <img src={product.productImagePath} alt={product.productName} className="image" />
                </Row>
                <Row className="product-name">
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
                      width: '200px',
                      height: '30px',
                      backgroundColor: '#6C4E31',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                      marginTop: '10px',
                    }}
                    onClick={() => handleAddToCart(product)}
                  >
                    ADD TO CART
                  </Button>
                </Row>
              </div>
            </Col>
          ))
        }
      </Row>

      {/* Modal for adding items to cart */}
      <Modal
        title="Add Item to Cart"
        width={400}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Add to Cart"
        cancelText="Cancel"
      >
        {selectedProduct && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img
              src={selectedProduct.productImagePath}
              alt={selectedProduct.productName}
              style={{ width: '200px', height: 'auto' }}
            />
            <Title level={4} style={{ textAlign: 'center', marginTop: '16px' }}>{selectedProduct.productName}</Title>
            <p style={{ textAlign: 'center' }}>Price: Rs {formatPrice(selectedProduct.productPricePerUnit)}</p>
            <InputNumber
              min={1}
              defaultValue={quantity}
              onChange={value => setQuantity(value || 1)}
              style={{ width: '100%', marginTop: '16px' }}
            />
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ProductsHome;
