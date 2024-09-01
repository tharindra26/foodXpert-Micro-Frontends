// services/productService.ts
import api from './axiosConfig';
import { AxiosResponse } from 'axios';

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

export const getAllProducts = async (): Promise<AxiosResponse<Product[]>> => {
  try {
    const response = await api.get('/products');
    return response;
  } catch (error) {
    console.error('Get all products service error:', error);
    throw error;
  }
};

export const getProductById = async (id: number): Promise<AxiosResponse<Product>> => {
  try {
    const response = await api.get(`/products/${id}`);
    return response;
  } catch (error) {
    console.error(`Get product by ID service error (ID: ${id}):`, error);
    throw error;
  }
};
