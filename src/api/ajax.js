/* 
对axio进行2次封装一个能发ajax请求的函数
1. 统一处理请求异常
2. 异步请求成功的数据不是response, 而是response.data
3. 对请求体参数进行urlencode处理, 而不使用默认的json方式(后台接口不支持)
4. 配置请求超时的时间
5. 通过请求头携带token数据
*/

import axios from 'axios'
import qs from 'qs'

const instance = axios.create({
  baseURL:'/api',
  timeout:20000 //4. 配置请求超时的时间
})

instance.interceptors.request.use((config)=>{
  //输入函数体
  // 3. 对请求体参数进行urlencode处理, 而不使用默认的json方式(后台接口不支持)
const data = config.data 
if(data instanceof Object){
  config.data=qs.stringify(data)
}
  return config
})

instance.interceptors.response.use(
  response => {
    // 2. 异步请求成功的数据不是response, 而是response.data
    return response.data
  },
  error => {
    // 统一处理请求异常
    return new Promise(()=>{})
  }
)

export default instance 