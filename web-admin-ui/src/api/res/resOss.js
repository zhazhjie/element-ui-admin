/** 
* @author: zhazhjie 
* @email: zhazhjie@vip.qq.com
* @date: 2019-02-20 15:08:31 
* @version: 1.0 
*/	
import request from '@/js/request'

export function upload(data) {
  return request({
    url: '/resOss/upload',
    method: 'post',
    data: data
  })
}

export function uploadFile(data) {
  return request({
    url: '/resOss/uploadFile',
    method: 'post',
    data: data
  })
}

export function listPage(params) {
  return request({
    url: '/resOss/listPage',
    method: 'get',
    params: params
  })
}
export function updateById(data) {
  return request({
    url: '/resOss/updateById',
    method: 'post',
    data:data
  })
}
export function deleteById(data) {
  return request({
    url: '/resOss/deleteById',
    method: 'post',
    data: data
  })
}
export function moveGroup(data) {
  return request({
    url: '/resOss/moveGroup',
    method: 'post',
    data: data
  })
}