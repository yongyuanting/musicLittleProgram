// pages/home-video/home-video.js
import {
  getTopMV
} from "../../services/video"

Page({
  data: {
    videoList: [],
    offset: 0,
    hasMore: true
  },
  onLoad() {
    // 发送请求
    this.fetchTopMV()
  },
  // 发送网络请求的函数
  async fetchTopMV() {
    // getTopMV().then(res=>{
    //   // console.log(res)
    //   this.setData({videoList:res.data})
    // })
    const res = await getTopMV(this.data.offset)
    const newVideoList = [...this.data.videoList, ...res.data]
    //  this.setData({videoList:this.data.videoList+res.data})
    this.setData({
      videoList: newVideoList
    })
    this.data.offset = this.data.videoList.length
    this.data.hasMore = res.hasMore
  },
  // ==============================监听上拉和下拉功能=====================
  onReachBottom() {
    // console.log("滚动到底部")
    if (this.data.hasMore) {
      this.fetchTopMV()
    } else {
      return
    }
  },
  async onPullDownRefresh() {
    console.log("下拉刷新")
    // 1.清空之前的数据
    this.setData({
      videoList: []
    })
    this.data.offset = 0
    this.data.hasMore = true
    // // 2.重新请求
    // this.fetchTopMV().then(() => {
    //   // 3.停止下拉刷新
    //   wx.stopPullDownRefresh()
    // })
    await this.fetchTopMV()
    wx.stopPullDownRefresh()
  },

  // ===================事件监听方法======================
  onVideoItemTap(event){
    // 1.第一种
    // const item = event.currentTarget.dataset.item
    // console.log("点击了",item)
    // wx.navigateTo({
    //   url: `/pages/detail_video/detail_video?id=${item.id}`,
    // })
  }
})