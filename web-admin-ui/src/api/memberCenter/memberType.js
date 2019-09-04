import request from '@/js/request'

export function fetchList(query) {
  return request({
    url: '/biz/identity/listPage',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return request({
    url: '/biz/identity/save',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/biz/identity/get?id=' + id,
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
    url: '/biz/identity/update',
    method: 'post',
    data: obj
  })
}

export function updBatch(id) {
  return request({
    url: '/biz/basicRefer/updateBatch',
    method: 'post',
    data: {ids:id}
  })
}
export function giftUpdObj(obj) {
  return request({
    url: '/biz/basicRefer/update',
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
export function getRule2(id) {
  return request({
    url: '/biz/basicRefer/listByIdentityId2/' + id,
    method: 'get'
  })
}

