import request from '@/utils/request'

// 用户登陆
export const login = (data) =>{
    return request({
        url: '/app/v1_0/authorizations',
        method: 'POST',
        data
    })
}
// 验证码
export const smsCode = (mobile) =>{
    return request({
        url: `/app/v1_0/sms/codes/${mobile}`,
        method: 'GET'
    })
}
// 获取用户信息
export const getUserInfo = () =>{
    return request({
        url: `/app/v1_0/user`,
        method: 'GET'
    })
}
// 获取用户频道
export const getUserChannels = () =>{
    return request({
        url:'/app/v1_0/user/channels',
        method: 'GET'
    })
}
// 获取用户个人资料
export const getUserProfile = () =>{
    return request({
        url: '/app/v1_0/user/profile',
        method: 'GET',

    })
}
// 修改用户资料
export const updateUser = (data) =>{
    return request({
        url: '/app/v1_0/user/profile',
        method: 'PATCH',
        data
    })
}