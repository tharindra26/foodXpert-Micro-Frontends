import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Row, Col, Table, InputNumber, Button, Alert, notification, Modal, Spin } from 'antd';
import { DeleteOutlined, LoadingOutlined } from '@ant-design/icons';
import { fetchCartDetails, addItemToCart, deleteCartItem, getProductById } from '../api/cartService'; // Import your API services

const { Title } = Typography;

const CartDetails: React.FC = () => {
  const { cartId } = useParams<{ cartId: string }>();
  const navigate = useNavigate();
  const [cart, setCart] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [placingOrder, setPlacingOrder] = useState<boolean>(false);

  useEffect(() => {
    const loadCartDetails = async () => {
      try {
        const response = await fetchCartDetails(Number(cartId));
        const cartData = response.data;
        
        // Fetch product details for each item in the cart
        const productDetailsPromises = cartData.items.map(async (item: any) => {
          try {
            const productResponse = await getProductById(Number(item.productId));
            const productData = productResponse.data;
        
            // Merge only specific fields from the product details
            return {
              ...item,
              productName: productData.productName,
              productPrice: productData.productPricePerUnit, // Adjust field names as necessary
            };
          } catch (error) {
            console.error(`Failed to fetch product details for ID: ${item.productId}`, error);
            // Return item with minimal details in case of error
            return {
              ...item,
              productName: 'Unknown Product', // Default value if product details are missing
              productPrice: 0, // Default value if product details are missing
            };
          }
        });

        const itemsWithProductDetails = await Promise.all(productDetailsPromises);
        setCart({ ...cartData, items: itemsWithProductDetails });
      } catch (err) {
        console.error('Failed to fetch cart details:', err);
        setError('Failed to fetch cart details');
      } finally {
        setLoading(false);
      }
    };

    loadCartDetails();
  }, [cartId]);

  const calculateTotalPrice = () => {
    return cart?.items.reduce((total: number, item: any) => total + item.quantity * item.productPrice, 0).toFixed(2);
  };

  const handleUpdateQuantity = async (productId: string, newQuantity: number) => {
    try {
      const response = await addItemToCart({
        cartId: Number(cartId),
        productId: productId,
        quantity: newQuantity,
      });
      
      const updatedItems = cart.items.map((item: any) =>
        item.productId === productId ? { ...item, quantity: newQuantity } : item
      );
      setCart({ ...cart, items: updatedItems });
      notification.success({ message: response.data.message });
    } catch (error) {
      console.error('Failed to update quantity:', error);
      notification.error({ message: 'Failed to update quantity' });
    }
  };

  const handleDeleteItem = async (id: number) => {
    try {
      await deleteCartItem(id);
      const updatedItems = cart.items.filter((item: any) => item.id !== id);
      setCart({ ...cart, items: updatedItems });
      notification.success({ message: 'Item deleted successfully' });
    } catch (error) {
      console.error('Failed to delete item:', error);
      notification.error({ message: 'Failed to delete item' });
    }
  };

  const handlePlaceOrder = async () => {
    setPlacingOrder(true);
    setTimeout(() => {
      setPlacingOrder(false);
      Modal.success({
        title: 'Order Placed',
        content: 'Your order has been placed successfully!',
        onOk: () => navigate('/home'),
      });
    }, 2000); // Simulating a delay for spinner
  };

  const columns = [
    {
      title: 'Product Name',
      dataIndex: 'productName',
      key: 'productName',
      render: (text: string) => <span style={{ color: 'black' }}>{text}</span>,
    },
    {
      title: 'Price (Rs)',
      dataIndex: 'productPrice',
      key: 'productPrice',
      render: (price: number) => <span style={{ color: 'black' }}>{price.toFixed(2)}</span>,
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (quantity: number, record: any) => (
        <InputNumber
          min={1}
          value={quantity}
          onChange={(value) => handleUpdateQuantity(record.productId, value || 1)}
        />
      ),
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
      render: (_: any, record: any) => <span style={{ color: 'black' }}>{(record.quantity * record.productPrice).toFixed(2)}</span>,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: any) => (
        <DeleteOutlined
          style={{ color: 'red', cursor: 'pointer', fontSize: '16px' }}
          onClick={() => handleDeleteItem(record.id)}
        />
      ),
    },
  ];

  if (loading) return <div>Loading...</div>;
  if (error) return <Alert message={error} type="error" />;

  return (
    <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: '20px', borderRadius: '8px' }}>
      <Title level={2} style={{ color: 'white' }}>Cart: {cart?.cartName}</Title>
      <Title level={3} style={{ color: 'white' }}>Total Price: Rs {calculateTotalPrice()}</Title>
      <Row>
        <Col span={24}>
          <Table
            bordered
            dataSource={cart?.items}
            columns={columns}
            rowKey="productId"
            pagination={false}
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }} // Semi-transparent background
            summary={() => (
              <Table.Summary.Row>
                <Table.Summary.Cell index={0} colSpan={3}>Total</Table.Summary.Cell>
                <Table.Summary.Cell index={0}>
                  <Typography.Text strong style={{ color: 'black' }}>Rs {calculateTotalPrice()}</Typography.Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={0} />
              </Table.Summary.Row>
            )}
          />
        </Col>
      </Row>
      <Row justify="end" style={{ marginTop: '20px' }}>
        <Col>
          <Button
            type="primary"
            onClick={handlePlaceOrder}
            style={{ backgroundColor: 'green', borderColor: 'green' }}
            disabled={placingOrder}
          >
            {placingOrder ? <span style={{ color: 'white' }}>Placing Order...</span> : 'Place Order'}
          </Button>
        </Col>
      </Row>
      {placingOrder && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', position: 'fixed', top: 0, left: 0, width: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 999 }}>
          <Spin indicator={<LoadingOutlined style={{ fontSize: 60, color: '#1BFC06' }} spin />} />
        </div>
      )}
    </div>
  );
};

export default CartDetails;
