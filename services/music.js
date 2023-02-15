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
export function getMusicPlayListDetail(id){
  return yytRequest.get({
    url:'playlist/detail',
    data:{
      id
    }
  })
}