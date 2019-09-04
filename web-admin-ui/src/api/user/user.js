import request from '@/js/request'

export function getRecommendTree(query) {
  return request({
    url: '/biz/memberCenter/getRecommendTree',
    method: 'get',
    params: query
  })
}
