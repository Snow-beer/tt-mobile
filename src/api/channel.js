import request from '@/utils/request'

export const getChannel = () =>{
    return request({
        url: '/app/v1_0/channels',
        method: 'GET'
    })

}