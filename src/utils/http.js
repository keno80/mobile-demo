import axios from 'axios'
import {Notify} from "vant";

//创建错误提示
const ErrMessagePop = msg => {
  Notify({
    message: msg,
    type: "danger",
    duration: 2000
  })
}

// 错误码
const ErrCodeMessage = (num) => {
  switch (num) {
    case 400:
      ErrMessagePop('请求或参数错误')
      break;
    case 401:
      ErrMessagePop('未授权')
      break;
    case 403:
      ErrMessagePop('登录或认证参数错误')
      break;
    case 404:
      ErrMessagePop('页面未找到')
      break;
    default:
      ErrMessagePop('请求错误')
  }
};

//创建axios实例
const instance = axios.create({
  timeout: 3000,
  url: `/api`
})

//请求头
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
instance.defaults.withCredentials = true

//创建请求拦截器
instance.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error + '错误')
  }
);

//创建响应拦截器
instance.interceptors.response.use(
  res => {
    if (res.status === 200) {
      return Promise.resolve(res)
    } else if (res.data.code === 20000) {
      return Promise.resolve(res)
    } else {
      return Promise.reject(res)
    }
  },
  error => {
    const {response} = error;
    if (response) {
      ErrCodeMessage(response.status, response.data.code);
      return Promise.reject(response)
    } else {
      return Promise.reject(error)
    }
  }
)

export default instance