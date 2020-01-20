/**
 * @author: zzj
 * @date: 2020-01-16 16:47:11
 * @version: 1.0
 */
import request from '../config/request'

export function upload(data) {
  return request({
    url: '/public/upload',
    method: 'post',
    data: data
  })
}

export function saveFeedback(data) {
  return request({
    url: '/feedback/save',
    method: 'post',
    data: data
  })
}
