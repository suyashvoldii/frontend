/* eslint-disable no-unused-vars */
import axios from 'axios';
import Storage from 'helpers/storage.service';
import { apiUrl } from '../constants/defaultValues';

const customAxios = axios.create({
  baseURL: apiUrl,
  timeout: 10000,
});

const getToken = () => {
  const token = Storage.authToken;
  return token?.access_token;
};

const requestHandler = (request) => {
  const token = getToken();
  console.log({ token });
  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
  }
  return request;
};

const responseHandler = (response) => {
  if (response.status === 401) {
    window.location = '/login';
  }

  return response;
};

const errorHandler = (error) => {
  return Promise.reject(error);
};

customAxios.interceptors.request.use(
  (request) => requestHandler(request),
  (error) => errorHandler(error)
);

customAxios.interceptors.response.use(
  (response) => responseHandler(response),
  (error) => errorHandler(error)
);

export default customAxios;
