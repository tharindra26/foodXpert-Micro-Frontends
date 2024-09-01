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

interface ProductCategory {
  id: number;
  categoryName: string;
  categoryDescription: string;
}

interface Product {
  id: number;
  productName: string;
  productDescription: string;
  productCategory: ProductCategory;
  productUnit: string;
  productPricePerUnit: number;
  quantity: number;
  productImagePath: string;
  deleted: boolean;
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

export const fetchCartDetails = async (
  cartId: number
): Promise<AxiosResponse<Cart>> => {
  try {
    const response = await api.get<Cart>(`/carts/${cartId}`);
    return response;
  } catch (error) {
    // Handle error appropriately
    throw error;
  }
}

// Function to delete cart item by item ID
export const deleteCartItem = async (
  itemId: number
): Promise<AxiosResponse<GenericAddOrUpdateResponse>> => {
  try {
    const response = await api.delete<GenericAddOrUpdateResponse>(`/carts/items/${itemId}`);
    return response;
  } catch (error) {
    // Handle error appropriately
    throw error;
  }
}

export const getProductById = async (id: number): Promise<AxiosResponse<Product>> => {
  try {
    const response = await api.get(`/products/${id}`);
    return response;
  } catch (error) {
    console.error(`Get product by ID service error (ID: ${id}):`, error);
    throw error;
  }
};



