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

interface AddCartItemRequestDTO {
  cartId: number;
  productId: string;
  quantity: number;
}

interface GenericAddOrUpdateResponse {
  success: boolean;
  message: string;
}

export const addItemToCart = async (
  addCartItemRequestDTO: AddCartItemRequestDTO
): Promise<AxiosResponse<GenericAddOrUpdateResponse>> => {
  try {
    const response = await api.post<GenericAddOrUpdateResponse>('/carts/items', addCartItemRequestDTO);
    return response;
  } catch (error) {
    // Handle error appropriately
    throw error;
  }
}


