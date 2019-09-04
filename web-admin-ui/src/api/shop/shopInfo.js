import request from '@/js/request'

export function listShopInfo(params) {
  return request({
    url: '/shopInfo/list',
    method: 'get',
    params: params
  })
}
