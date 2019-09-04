import request from '@/js/request'

export function fetchList(query) {
  return request({
    url: '/biz/memberWithdrawApply/listPage',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return request({
    url: '/biz/memberWithdrawApply/save',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/biz/memberWithdrawApply/get?id=' + id,
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
    url: '/biz/memberWithdrawApply/update',
    method: 'post',
    data: obj
  })
}

export function audit(id, state, reason) {
  return request({
    url: '/biz/memberWithdrawApply/audit/' + id + '/' + state + '?reason=' + reason,
    method: 'get'
  })
}

export function remit(id, remitNo) {
  return request({
    url: '/biz/memberWithdrawApply/remit/' + id + '?remitNo=' + remitNo,
    method: 'get'
  })
}
