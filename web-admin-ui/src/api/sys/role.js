import request from '@/js/request'

export function roleList() {
  return request({
    url: '/sys/role/select',
    method: 'get'
  })
}

export function fetchList(query) {
  return request({
    url: '/sys/role/list',
    method: 'get',
    params: query
  })
}

export function orgRoleList(orgId) {
  return request({
    url: '/sysRole/list/' + orgId,
    method: 'get'
  })
}

export function getObj(id) {
  return request({
    url: '/sys/role/info/' + id,
    method: 'get'
  })
}

export function addObj(obj) {
  return request({
    url: '/sys/role/add',
    method: 'post',
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
    method: 'post',
    data: id
  })
}

export function permissionUpd(roleId, menuIds) {
  return request({
    url: '/sysRole/roleMenuUpd',
    method: 'put',
    params: {
      roleId: roleId,
      menuIds: menuIds
    }
  })
}

export function fetchRoleTree(roleId) {
  return request({
    url: '/sysMenu/roleTree/' + roleId,
    method: 'get'
  })
}

export function fetchOrgTree(query) {
  return request({
    url: '/sysOrg/tree',
    method: 'get',
    params: query
  })
}
