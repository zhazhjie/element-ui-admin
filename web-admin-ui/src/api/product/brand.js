import request from '@/js/request'

export function fetchListPage(query) {
  return request({
    url: '/productBrand/listPage',
    method: 'get',
    params: query
  })
}

export function fetchList(query) {
  return request({
    url: '/productBrand/list',
    method: 'get',
    params: query
  })
}

export function delObj(id) {
  return request({
    url: '/productBrand/delete/' + id,
    method: 'get'
  })
}

export function addObj(obj) {
  return request({
    url: '/productBrand/add',
    method: 'post',
    data: obj
  })
}

export function updObj(obj) {
  return request({
    url: '/productBrand/update',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/productBrand/getById/' + id,
    method: 'get'
  })
}
