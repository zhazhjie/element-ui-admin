import request from '@/js/request'

export function fetchList(query) {
  return request({
    url: '/repositoryInfo/listPage',
    method: 'get',
    params: query
  })
}

export function fetchListAll() {
  return request({
    url: '/repositoryInfo/list',
    method: 'get',
    params: null
  })
}

export function delObj(id) {
  return request({
    url: '/repositoryInfo/deleteById',
    method: 'get',
    params: {id: id}
  })
}

export function addObj(obj) {
  return request({
    url: '/repositoryInfo/save',
    method: 'post',
    data: obj
  })
}

export function updObj(obj) {
  return request({
    url: '/repositoryInfo/updateById',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/repositoryInfo/getById',
    method: 'get',
    params: {id: id}
  })
}
