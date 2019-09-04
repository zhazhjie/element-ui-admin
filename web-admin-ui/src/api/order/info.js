import request from '@/js/request'

export function fetchList(query) {
  return request({
    url: '/orderInfo/listPage',
    method: 'get',
    params: query
  })
}

export function listDetailPage(query) {
  return request({
    url: '/orderInfo/listDetailPage',
    method: 'get',
    params: query
  })
}

export function getAfterSaleByOrderDetailId(query) {
  return request({
    url: '/orderInfo/getAfterSaleByOrderDetailId',
    method: 'get',
    params: query
  })
}
export function updateAfterSaleState(query) {
  return request({
    url: '/orderInfo/updateAfterSaleState',
    method: 'get',
    params: query
  })
}

export function getDetailById(id) {
  return request({
    url: '/orderInfo/getDetailById',
    method: 'get',
    params: {id: id}
  })
}

export function updateRemarkByIdBatch(idList, remark) {
  return request({
    url: '/orderInfo/updateRemarkByIdBatch',
    method: 'post',
    params: {idList: idList, remark: remark}
  })
}

export function updateStateSend(idList) {
  return request({
    url: '/orderInfo/updateStateSend',
    method: 'post',
    params: {idList: idList}
  })
}

export function updateStateSend2(obj) {
  return request({
    url: '/orderInfo/updateStateSend2',
    method: 'post',
    data: obj
  })
}

export function getExpressInfoList(obj) {
  return request({
    url: '/order/expressInfo/list',
    method: 'get',
    params: obj
  })
}
