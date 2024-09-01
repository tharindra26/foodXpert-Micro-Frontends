import api from './axiosConfig';
import axios, { AxiosResponse } from 'axios';

interface SignUpData {
  name: string;
  email: string;
  password: string;
}

interface SignInData {
  email: string;
  password: string;
}

export const signUp = async (data: SignUpData): Promise<AxiosResponse<any>> => {
  try {
      console.log('SignUp service data:', data);
      const response = await api.post('/auth/signUp', data);
      return response;
  } catch (error) {
      console.error('SignUp service error:', error);
      throw error; // Rethrow the error to handle it in the calling code
  }
};

export const signIn = async (data: SignInData): Promise<AxiosResponse<any>> => {
  try {
    console.log('SignIn service data:', data);
    const response = await api.post('/auth/signIn', data);
    return response;
  } catch (error) {
    console.error('SignIn service error:', error);
    throw error; // Rethrow the error to handle it in the calling code
  }
};


