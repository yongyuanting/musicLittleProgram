// pages/detail_video/detail_video.js
import {
  getMVUrl,
  getMVInfo,
  getMVRelate
} from "../../../services/video"
Page({
  data: {
    id: 0,
    mvUrl: "",
    danmuList: [{
        text: '好汀',
        color: '#ff0000',
        time: 3
      },
      {
        text: '淦',
        color: '#fff000',
        time: 10
      },
      {
        text: '在下到此一游',
        color: '#f01253',
        time: 12
      }
    ],
    mvInfo: {},
    relatedVideo: []
  },
  onLoad(options) {
    const id = options.id
    this.setData({
      id
    })
    this.fetchMVUrl()
    this.fetchMVInfo()
    this.fetchMVRelate()
  },
  async fetchMVUrl() {
    // const res = await getMVUrl(id)
    const res = await getMVUrl(this.data.id)
    this.setData({
      mvUrl: res.data.url
    })
  },
  async fetchMVInfo() {
    const res = await getMVInfo(this.data.id)
    this.setData({
      mvInfo: res.data
    })
    console.log(res)
  },
  async fetchMVRelate() {
    const res = await getMVRelate(this.data.id)
    console.log(res)
    this.setData({
      relatedVideo: res.data
    })
  }

})