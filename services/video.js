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