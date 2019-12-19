import {
  reqAddress,
  reqCategorys,
  reqShops,
  reqAutoLogin,
  reqShopGoods,
  reqShopRatings,
  reqShopInfo
} from '@/api'

import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USER,
  RECEIVE_TOKEN,
  RESET_USER,
  RESET_TOKEN,
  RECEIVE_GOODS,
  RECEIVE_RATINGS,
  RECEIVE_INFO,
} from './mutations-types'

export default {
  async getAddress({commit,state}){
    const {longitude, latitude} = state
    const result = await reqAddress(longitude, latitude)
    if(result.code===0){
      const address = result.data 
      commit(RECEIVE_ADDRESS,address)
    }
  },

  async getCategorys({commit},callback){
    const result =await reqCategorys()
    if (result.code===0) {
      const categorys = result.data
      commit(RECEIVE_CATEGORYS,categorys)
      typeof callback === 'function' && callback()
    }
  },

  async getShops({commit,state}){
    const {longitude, latitude}=state
    const result = await reqShops({longitude, latitude})
    if (result.code===0) {
      const shops = result.data
      commit(RECEIVE_SHOPS,shops)
    }
  },

  saveUser({commit},user){
    const token = user.token
    localStorage.setItem('token_key',token)
    
    delete user.token
    commit(RECEIVE_USER,{user})
    commit(RECEIVE_TOKEN,{token})
  },

  async autoLogin({commit,state}){
    if (state.token&&!state.user._id) {
      const result = await reqAutoLogin()
      if (result.code===0) {
        const user = result.data
        commit(RECEIVE_USER,{user})
      }
    }
  },

  logOut({commit}){
    localStorage.removeItem('token_key')
    commit(RESET_USER)
    commit(RESET_TOKEN)
  },

  async getShopGoods({commit},cb){
                       // 在actions里发送请求的时候 一定要记得调用()
    const result = await reqShopGoods()
    console.log(result)
    if (result.code===0) {
      //data 返回的 就直接是goods的内容 没有包在对象里 不用解构赋值
      const goods =result.data
      commit(RECEIVE_GOODS,{goods})
      typeof cb==='function'&& cb()
    } 
  },

  async getShopRatings ({commit},cb){
    const result = await reqShopRatings()
    console.log(result)
    if (result.code===0) {
      const ratings = result.data
          //mutation的名字不能加引号 因为用的是变量名里面的值
      commit(RECEIVE_RATINGS,{ratings})
      typeof cb==='function'&& cb()
    }
  },

  async getShopInfo({commit},cb){
    const result = await reqShopInfo()
    console.log(result)
    if (result.code===0) {
      const info = result.data
      commit(RECEIVE_INFO,{info})
      typeof cb ==='function'&& cb()
    }
  }

}