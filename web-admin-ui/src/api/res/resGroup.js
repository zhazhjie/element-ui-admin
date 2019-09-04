/** 
* @author: zhazhjie 
* @email: zhazhjie@vip.qq.com
* @date: 2019-02-20 15:08:31 
* @version: 1.0 
*/	
import request from '@/js/request'

export function listGroup(params) {
  return request({
    url: '/resGroup/list',
    method: 'get',
    params: params
  })
}
export function saveGroup(data) {
  return request({
    url: '/resGroup/save',
    method: 'post',
    data:data
  })
}
export function updGroup(data) {
  return request({
    url: '/resGroup/updateById',
    method: 'post',
    data:data
  })
}
export function delGroup(id) {
  return request({
    url: '/resGroup/deleteById/'+id,
    method: 'post',
  })
}
export function moveGroup(data) {
  return request({
    url: '/resGroup/moveGroup',
    method: 'post',
    data: data
  })
}