import request from '@/js/request'

export function fetchList(query) {
  return request({
    url: '/biz/softwareType/listPage',
    method: 'get',
    params: query
  })
}

export function fetchSoftwareTypeList(query) {
  return request({
    url: '/biz/softwareType/list',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return request({
    url: '/biz/softwareType/add',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/biz/softwareType/' + id,
    method: 'get'
  })
}


export function updObj(obj) {
  return request({
    url: '/biz/softwareType/update',
    method: 'post',
    data: obj
  })
}

export function delObj(id) {
  return request({
    url: '/biz/softwareType/deleteById/' + id,
    method: 'post'
  })
}


