/** 
* @author: zhazhjie 
* @email: zhazhjie@vip.qq.com
* @date: 2019-02-27 21:41:11 
* @version: 1.0 
*/	
import request from '@/js/request'

export function listArea(query) {
  return request({
    url: '/sys/sysPlaceRegion/list',
    method: 'get',
    params: query
  })
}