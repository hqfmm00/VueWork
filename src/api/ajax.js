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
import {Indicator,Toast, MessageBox} from 'mint-ui'
import store from '../vuex/store'
import router from '../router'

const instance = axios.create({
  baseURL:'/api',
  timeout:20000 //4. 配置请求超时的时间
})

instance.interceptors.request.use((config)=>{
  Indicator.open()
  //输入函数体
  // 3. 对请求体参数进行urlencode处理, 而不使用默认的json方式(后台接口不支持)
const data = config.data 
if(data instanceof Object){
  config.data=qs.stringify(data)
}

  const token = store.state.token
  
  //如果有token
  if (token) {
    //在请求头中携带
    config.headers['Authorization']=token

    //如果没有token
  }else{
    const needCheck = config.headers.needCheck
    //在没有token的情况下还需要验证token,就抛出一个错误(中断promise链),不发请求
    if(needCheck){
      throw new Error('没有登录,不能请求')
    }
  }
  return config
})

instance.interceptors.response.use(
  response => {
    Indicator.close()
    // 2. 异步请求成功的数据不是response, 而是response.data
    return response.data
  },
  
  // 统一处理请求异常   
  error => {
    Indicator.close()
    const response = error.response
    if (!response) {
      const path = router.currentRoute.path
      if (path!=='/login') {
        router.replace('/login')
        Toast(error.message)
      }
    }else{
      if (error.response.status===401) {
        const path = router.currentRoute.path
        if (path!=='/login') {
          store.dispatch('logOut')
          router.replace('/login')
        Toast(response.data.message||'登录失效,请重新登录')
        }
      }else if(error.response.status===404){
        MessageBox('提示','访问的资源不存在')
      }else{
        MessageBox('提示','请求出错'+error.message)
      }
      return new Promise(()=>{})
    }
  }
    
)

export default instance 