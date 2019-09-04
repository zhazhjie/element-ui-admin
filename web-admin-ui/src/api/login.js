/** 
* @author: zhazhjie 
* @email: zhazhjie@vip.qq.com
* @date: 2018-11-05 10:48:31 
* @version: 1.0 
*/	
import request from '@/js/request'

export const login = (data)=> {
  return request({
    url: '/sys/login',
    method: 'post',
    data:data
  })
}

export const getUserInfo = () => {
  return request({
    url: '/sys/user/info',
    method: 'get'
  })
}

export const logout = (accesstoken, refreshToken) => {
  return request({
    url: '/logout',
    method: 'post',
    params: { accesstoken, refreshToken }
  })
}
