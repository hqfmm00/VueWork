import Mock from 'mockjs'
import data from './data.json'

Mock.mock('/api/goods',{code:0 , data:data.goods})
Mock.mock('/api/ratings',{code:0 , data:data.ratings})
Mock.mock('/api/info',{code:0 , data:data.info})
console.log('你怎么可能写出那么low的文字?(I\'m mock-serve)')