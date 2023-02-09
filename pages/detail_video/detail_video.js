// pages/detail_video/detail_video.js
import {
  getMVUrl
} from "../../services/video"
Page({
  data: {
    id: 0,
    mvUrl: ""
  },
  onLoad(options) {
    const id = options.id
    this.setData({id})
    this.fetchMVUrl(id)
  },
  async fetchMVUrl(id) {
    // const res = await getMVUrl(id)
    const res = await getMVUrl(this.data.id)
    this.setData({
      mvUrl: res.data.url
    })

  }

})