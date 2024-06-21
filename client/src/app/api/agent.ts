import axios, { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { router } from '../router/Router';

//crated timeout for each request
const sleep = () => new Promise((resolve) => setTimeout(resolve, 1000));

//set URL
axios.defaults.baseURL = 'http://localhost:5000/api/';
axios.defaults.withCredentials = true;

//adding headers
const apiClient = axios.create({
  headers: {
    'Content-Type': 'application/json',
    //------We can add other headers here like token
  },
});

//added interceptor to catch error
apiClient.interceptors.response.use(
  async (response) => {
    //remove this for production
    await sleep();
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
        toast.error(data.title);
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
  get: (url: string) => apiClient.get(url).then(responseBody),
  put: (url: string, body: object) =>
    apiClient.put(url, body).then(responseBody),
  post: (url: string, body: object) =>
    apiClient.post(url, body).then(responseBody),
  delete: (url: string) => apiClient.delete(url).then(responseBody),
};

//For product
const Catalog = {
  list: () => request.get('products'),
  details: (id: number) => request.get(`products/${id}`),
};

//For test error
const TestErrors = {
  get400Error: () => request.get('buggy/bad-request'),
  get404Error: () => request.get('buggy/not-found'),
  get401Error: () => request.get('buggy/unauthorized'),
  getValidationError: () => request.get('buggy/validation-error'),
  get500Error: () => request.get('buggy/server-error'),
};

//For basket
const Basket = {
  getBasket: () => request.get('basket'),
  addItem: (productId: number, quantity = 1) =>
    request.post(`basket?productId=${productId}&quantity=${quantity}`, {}),
  removeItem: (productId: number, quantity = 1) =>
    request.delete(`basket?productId=${productId}&quantity=${quantity}`),
};

const agent = {
  Catalog,
  TestErrors,
  Basket,
};
export default agent;
