import request from '@/js/request'

export function fetchList(query) {
  return request({
    url: '/productInfo/listPage',
    method: 'get',
    params: query
  })
}

export function fetchProductList() {
  return request({
    url: '/productInfo/list',
    method: 'get',
  })
}

export function delObj(id) {
  return request({
    url: '/productInfo/deleteById',
    method: 'get',
    params: {id: id}
  })
}

export function updateStateByIdBatch(idList, state) {
  return request({
    url: '/productInfo/updateStateByIdBatch',
    method: 'post',
    params: {idList: idList, state: state}
  })
}

export function addObj(obj) {
  return request({
    url: '/productInfo/save',
    method: 'post',
    data: obj
  })
}

export function updObj(obj) {
  return request({
    url: '/productInfo/updateById',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/productInfo/getById',
    method: 'get',
    params: {id: id}
  })
}

export function fetchSelectedProduct(id) {
  return request({
    url: '/productInfo/getSelectedProduct',
    method: 'get',
    params: {ids: id}
  })
}

export function batchUpdateDiscount(idList, discount) {
  return request({
    url: '/productInfo/batchUpdateDiscountById',
    method: 'post',
    params: {idList: idList, discount: discount}
  })
}
