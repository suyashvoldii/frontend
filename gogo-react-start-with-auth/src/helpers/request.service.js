// import axios from './customAxios';
import axios from 'axios';
import Storage from './storage.service';
import { apiUrl } from '../constants/defaultValues';

const token = Storage.getItem('gogo_token');
console.log({ token });
// const getToken = () => {
//   const token = Storage.getItem('gogo_token');
//   return token ? token.access_token : null;
// };

const requestHandler = (request) => {
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

axios.interceptors.request.use(
  (request) => requestHandler(request),
  (error) => errorHandler(error)
);

axios.interceptors.response.use(
  (response) => responseHandler(response),
  (error) => errorHandler(error)
);

class Request {
  static get(url) {
    return axios.get(url);
  }

  // static post(url, body) {
  //     const formData = new FormData();
  //     for (key of body) {
  //         formData.append(key, body[key]);
  //     }
  //     return axios.post(self.getBaseUrl() + url, formData);
  // }

  static postJson(url, body) {
    return axios.post(apiUrl + url, body);
  }
  
  static putJson(url, val) {
    return axios.put(apiUrl + url, val);
  }

  static getJson(url, val) {
    return axios.get(apiUrl + url , val);
  }

  static deleteJson(url, val) {
    return axios.delete(apiUrl + url, val);
  }
}

export default Request;
