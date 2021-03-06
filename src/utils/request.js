import axios from 'axios'
import store from '@/store'

export const request = axios.create({
    baseURL: 'http://112.74.99.5:3000'
    
})

// 响应拦截器
request.interceptors.request.use(function (config) {
    const { user } = store.state

    if(user){
        config.headers.Authorization = `Bearer ${user.token}`
    }
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });

export default request
