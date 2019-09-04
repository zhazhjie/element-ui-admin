import request from '@/js/request'

export function fetchList(query) {
  return request({
    url: '/biz/withdrawRule/listPage',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return request({
    url: '/biz/withdrawRule/save',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/biz/withdrawRule/get?id=' + id,
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
    url: '/biz/withdrawRule/update',
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

export function getRule(id) {
  return request({
    url: '/biz/basicRefer/listByIdentityId/' + id,
    method: 'get'
  })
}

