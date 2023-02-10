import {
  yytRequest
} from './index'

// 获取轮播图
export function getMusicBanner(type = 0) {
  return yytRequest.get({
    url: 'banner',
    data: {
      type
    }
  })
}