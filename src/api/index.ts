import axios, { AxiosResponse } from "axios";

axios.defaults.withCredentials = true;
export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
  withCredentials: true,
});

export default class NetworkManager {
  static async get<T>(url: string): Promise<AxiosResponse<T, any>> {
    const response = await axiosInstance.get<T>(url);
    return response as AxiosResponse<T, any>;
  }

  static async post<T, U>(
    url: string,
    body: U
  ): Promise<AxiosResponse<T, any>> {
    const response = await axiosInstance.post<T>(url, body);
    return response as AxiosResponse<T, any>;
  }

  static async put<T, U>(url: string, body: U): Promise<AxiosResponse<T, any>> {
    const response = await axiosInstance.put<T>(url, body);
    return response as AxiosResponse<T, any>;
  }

  static async delete<T>(url: string): Promise<AxiosResponse<T, any>> {
    const response = await axiosInstance.delete<T>(url);
    return response as AxiosResponse<T, any>;
  }

  static async patch<T, U>(
    url: string,
    body: U
  ): Promise<AxiosResponse<T, any>> {
    const response = await axiosInstance.patch<T>(url, body);
    return response as AxiosResponse<T, any>;
  }
}
