import {yytRequest} from "./index"
// 请求mv列表
export function getTopMV(offset=0,limit=20){
  return yytRequest.get({
    url:'top/mv',
    data:{
      offset,
      limit
    }
  })
}
// 请求MV详情
export function getMVUrl(id){
  return yytRequest.get({
    url:"mv/url",
    data:{
      id
    }
  })
}
// 请求MV下方数据
export function getMVInfo(mvid){
  return yytRequest.get({
    url:'mv/detail',
    data:{
      mvid
    }
  })
}

// 请求MV下方关联数据
export function getMVRelate(id){
  return yytRequest.get({
    url:'related/allvideo',
    data:{
      id
    }
  })
}