import request from '@/js/request'



export function fetchIdentityList() {
  return request({
    url: '/biz/identity/listActive',
    method: 'get',
  })
}

export function fetchList(query) {
  return request({
    url: '/biz/member/listPage',
    method: 'get',
    params: query
  })
}

export function fetchLevelChangeList(query) {
  return request({
    url: '/biz/memberIdentityRecord/listPage',
    method: 'get',
    params: query
  })
}

export function getRecommendList(query) {
  return request({
    url: '/biz/member/listRecommendsPage',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return request({
    url: '/biz/member/save',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/biz/member/get?id=' + id,
    method: 'get'
  })
}

export function getGiftList(id) {
  return request({
    url: '/biz/memberPrivilege/get',
    method: 'get',
    params:{memberId:id}
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
    url: '/biz/member/update',
    method: 'post',
    data: obj
  })
}

export function updState(obj) {
  return request({
    url: '/biz/member/updateState',
    method: 'post',
    data: obj
  })
}

export function updateIdentity(obj) {
  return request({
    url: '/biz/member/updateIdentity',
    method: 'post',
    params: obj
  })
}

export function fetchHighIdentityList(id) {
  return request({
    url: '/biz/identity/listHighLevel',
    method: 'get',
    params: {identityId:id}
  })
}



