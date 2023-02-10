export function querySelect(selector){
  return new Promise((resolve,reject)=>{
    const query = wx.createSelectorQuery()
    query.select(selector).boundingClientRect()
    query.exec((res)=>{
      // console.log("看看矩形框",res)
      // this.setData({
      //   bannerHeight:res[0].height
      // })
      // 不能在这里return,这里return 和querySelect没关系
      resolve(res)
    })
  })
  
}