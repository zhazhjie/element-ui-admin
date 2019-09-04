import request from '@/js/request'

export function fetchList(query) {
  return request({
    url: '/sys/user/list',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return request({
    url: '/sys/user/add',
    method: 'post',
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
    method: 'post',
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
    url: '/sys/user/resetPwd',
    method: 'post',
    params: {id: id}
  })
}

