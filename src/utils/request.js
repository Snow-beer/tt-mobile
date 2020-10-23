import axios from 'axios'

export const request = axios.create({
    baseURL: 'http://ttapi.research.itcast.cn'
})



export default request