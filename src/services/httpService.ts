import axios, { AxiosResponse } from "axios";
// import CustomError from '@/utils/customError';
// import { ICaughtError } from '@/interfaces/errorInterfaces';
const API_URL =
  process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_API_URL_DEV
    : process.env.REACT_APP_API_URL_PROD;
export const baseUrl = (path: string | number): string => {
  return `${API_URL}${path}`;
};

export default class HTTPService {
  static get(path = ""): Promise<any> {
    return axios({
      method: "get",
      url: baseUrl(path),
      withCredentials: true,
    }).then((response: AxiosResponse) => {
      return response;
    });
    // .catch((err: ICaughtError) => {
    //   throw new CustomError(err);
    // });
  }

  static post(path = "", data: any): Promise<AxiosResponse> {
    return axios({
      method: "post",
      url: baseUrl(path),
      data,
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }).then((response: AxiosResponse) => {
      return response;
    });
    // .catch((err: ICaughtError) => {
    //   throw new CustomError(err);
    // });
  }

  static patch(path = "", data: any): Promise<any> {
    return axios({
      method: "patch",
      url: baseUrl(path),
      data,
      withCredentials: true,
    }).then((response: AxiosResponse) => {
      return response;
    });
    // .catch((err: ICaughtError) => {
    //   throw new CustomError(err);
    // });
  }

  static delete(path = ""): Promise<any> {
    return axios({
      method: "delete",
      url: baseUrl(path),
      withCredentials: true,
    }).then((response: AxiosResponse) => {
      return response;
    });
    // .catch((err: ICaughtError) => {
    //   throw new CustomError(err);
    // });
  }
}
