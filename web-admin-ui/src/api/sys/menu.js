/**
* @author: zhazhjie
* @email: zhazhjie@vip.qq.com
* @date: 2018-11-05 13:58:23
* @version: 1.0
*/

import request from '@/js/request'

export function findMenuTree(data) {
  return request({
    url: '/sys/menu/list',
    method: 'get',
    params: data
  })
}
export function selectMenu() {
  return request({
    url: '/sys/menu/select',
    method: 'get'
  })
}
export function findNavTree(query) {
  return request({
    url: '/sys/menu/nav',
    method: 'get',
    params: query
  })
}
export function getSimpleTree(query) {
  return request({
    url: '/sys/menu/tree',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return request({
    url: '/sys/menu/add',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/sys/menu/info/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/sys/menu/delete/' + id,
    method: 'post'
  })
}

export function udpObj(obj) {
  return request({
    url: '/sys/menu/update',
    method: 'post',
    data: obj
  })
}
