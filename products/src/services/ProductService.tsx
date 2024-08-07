import axios from 'axios';

const API_URL = 'http://localhost:3000/api/v1/products'; 

export const fetchProducts = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};
