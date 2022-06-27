import axios, { AxiosInstance } from 'axios';

export const useConnection = (): AxiosInstance => {
  const connection = axios.create({
    baseURL: 'https://costumers-api.herokuapp.com',
  });

  return connection;
};
