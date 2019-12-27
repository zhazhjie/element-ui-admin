import request from '../../config/request'
export function listPage(params) {
  return request({
    url: '/sys/role/listPage',
    method: 'get',
    params
  })
}
export function roleList() {
  return request({
    url: '/sys/role/list',
    method: 'get'
  })
}

export function addObj(obj) {
  return request({
    url: '/sys/role/add',
    method: 'put',
    data: obj
  })
}

export function updObj(obj) {
  return request({
    url: '/sys/role/update',
    method: 'post',
    data: obj
  })
}

export function delObj(id) {
  return request({
    url: '/sys/role/delete',
    method: 'delete',
    data: id
  })
}
