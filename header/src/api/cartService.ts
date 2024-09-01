// services/cartServices.ts
import api from './axiosConfig';
import { AxiosResponse } from 'axios';

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

export const fetchCarts = async (userEmail: string): Promise<AxiosResponse<Cart[]>> => {
  try {
    const response = await api.get('/carts/user', { params: { userEmail } });
    return response;
  } catch (error) {
    console.error('Fetch carts service error:', error);
    throw error;
  }
};

export const createCart = async (userEmail: string, cartName: string): Promise<AxiosResponse<Cart>> => {
  try {
    const response = await api.post('/carts', { userEmail, cartName });
    return response;
  } catch (error) {
    console.error('Create cart service error:', error);
    throw error;
  }
};
