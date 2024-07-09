import axios, { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { router } from '../router/Router';
import { Pagination } from '../models/pagination';
import { store } from '../store/configureStore';

//crated timeout for each request
const sleep = () => new Promise((resolve) => setTimeout(resolve, 1000));

//set URL
axios.defaults.baseURL = 'http://localhost:5000/api/';
axios.defaults.withCredentials = true;

//adding headers
axios.interceptors.request.use((config) => {
  const token = store.getState().account.user?.token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
//added interceptor to catch error
axios.interceptors.response.use(
  async (response) => {
    //remove this for production
    await sleep();
    //Getting pagination values from header
    const pagination = response.headers['pagination'];
    if (pagination) {
      response.data = new Pagination(response.data, JSON.parse(pagination));
      return response;
    }
    return response;
  },
  (error: AxiosError) => {
    const { status, data } = error.response as AxiosResponse;
    switch (status) {
      case 400:
        if (data.errors) {
          const modelStateErrors: string[] = [];
          for (const key in data.errors) {
            if (data.errors[key]) {
              modelStateErrors.push(data.errors[key]);
            }
          }
          throw modelStateErrors.flat();
        }
        toast.error(data.title);
        break;
      case 401:
        toast.error(data.title || 'Unauthorized');
        break;
      case 404:
        router.navigate('/not-found');
        break;
      case 500:
        router.navigate('/server-error', { state: { error: data } });
        break;
    }
    return Promise.reject(error.response);
  }
);

const responseBody = (response: AxiosResponse) => response.data;

const request = {
  get: (url: string, params?: URLSearchParams) =>
    axios.get(url, { params }).then(responseBody),
  put: (url: string, body: object) => axios.put(url, body).then(responseBody),
  post: (url: string, body: object) => axios.post(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
};

//For product
const Catalog = {
  list: (params: URLSearchParams) => request.get('products', params),
  details: (id: number) => request.get(`products/${id}`),
  fetchFilters: () => request.get(`products/filters`),
};

//For test error
const TestErrors = {
  get400Error: () => request.get('buggy/bad-request'),
  get404Error: () => request.get('buggy/not-found'),
  get401Error: () => request.get('buggy/unauthorized'),
  getValidationError: () => request.get('buggy/validation-error'),
  get500Error: () => request.get('buggy/server-error'),
};

//For Account
const Account = {
  login: (values: any) => request.post('account/login', values),
  register: (values: any) => request.post('account/register', values),
  fetchCurrentUser: () => request.get('account/currentUser'),
  fetchAddress: () => request.get('account/savedAddress'),
};

//For basket
const Basket = {
  getBasket: () => request.get('basket'),
  addItem: (productId: number, quantity = 1) =>
    request.post(`basket?productId=${productId}&quantity=${quantity}`, {}),
  removeItem: (productId: number, quantity = 1) =>
    request.delete(`basket?productId=${productId}&quantity=${quantity}`),
};

//For order
const Order = {
  list: () => request.get('orders'),
  fetch: (id: number) => request.get(`orders/${id}`),
  create: (values: any) => request.post('orders', values),
};

const agent = {
  Catalog,
  TestErrors,
  Basket,
  Account,
  Order,
};
export default agent;
