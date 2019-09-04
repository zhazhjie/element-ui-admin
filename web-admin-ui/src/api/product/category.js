import request from '@/js/request'

export function fetchList(query) {
  return request({
    url: '/productCategory/list',
    method: 'get',
    params: query
  })
}

export function delObj(id) {
  return request({
    url: '/productCategory/deleteById',
    method: 'get',
    params: {id: id}
  })
}

export function addObj(obj) {
  return request({
    url: '/productCategory/save',
    method: 'post',
    data: obj
  })
}

export function updObj(obj) {
  return request({
    url: '/productCategory/updateById',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/productCategory/getById',
    method: 'get',
    params: {id: id}
  })
}
