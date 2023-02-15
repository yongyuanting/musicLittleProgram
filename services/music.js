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
// 获取热歌榜
export function getMusicPlayListDetail(id) {
  return yytRequest.get({
    url: 'playlist/detail',
    data: {
      id
    }
  })
}
// 获取热门歌单
export function getSongMenuList(cat = "全部", limit = 6, offset = 0) {
  return yytRequest.get({
    url: 'top/playlist',
    data: {
      cat,
      limit,
      offset
    }
  })
}