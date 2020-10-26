import request from '@/utils/request'

// 联想查询
export const getSearchSuggestions = (q) =>{
    return request({
        url: '/app/v1_0/suggestion',
        method: 'GET',
        params:{
            q
        }
    })
}