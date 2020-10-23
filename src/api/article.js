import request from '@/utils/request'

export const getArticeList = (params) =>{
    return request({
        method: 'GET',
        url: '/app/v1_1/articles',
        params
      })
}