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
// 获取搜索结果
export const getSearchResult = (params) =>{
    return request({
        url: '/app/v1_0/search',
        method: 'GET',
        params
    })
}