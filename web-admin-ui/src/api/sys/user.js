import request from '@/js/request'

export function fetchList(query) {
  return request({
    url: '/sys/user/listPage',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return request({
    url: '/sys/user/add',
    method: 'put',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/sys/user/info/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/sys/user/delete',
    method: 'delete',
    data: id
  })
}

export function updObj(obj) {
  return request({
    url: '/sys/user/update',
    method: 'post',
    data: obj
  })
}

export function resetPwd(id) {
  return request({
    url: '/sys/user/resetPassword/'+id,
    method: 'post',
    params: {id: id}
  })
}

