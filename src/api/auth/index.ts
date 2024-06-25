import { AxiosResponse } from "axios";
import NetworkManager, { axiosInstance } from "..";

export default class AuthNetworkManager extends NetworkManager {
  static async post<T, U>(
    url: string,
    body: U
  ): Promise<AxiosResponse<T, any>> {
    const response = await axiosInstance.post<T>(url, body);
    return response.data as AxiosResponse<T, any>;
  }
}
