/** 
* @author: zhazhjie 
* @email: zhazhjie@vip.qq.com
* @date: 2019-02-28 19:56:31 
* @version: 1.0 
*/	
import request from '@/js/request'

export function listPage(params) {
  return request({
    url: '/transport/listPage',
    method: 'get',
    params: params
  })
}
export function save(data) {
  return request({
    url: '/transport/save',
    method: 'post',
    data:data
  })
}
export function updateById(data) {
  return request({
    url: '/transport/updateById',
    method: 'post',
    data:data
  })
}
export function deleteById(id) {
  return request({
    url: '/transport/deleteById/'+id,
    method: 'post',
  })
}
export function getById(id) {
  return request({
    url: '/transport/getById/'+id,
    method: 'get',
  })
}