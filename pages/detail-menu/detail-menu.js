// pages/detail-menu/detail-menu.js

import {
  getSongMenuTag,
  getSongMenuList
} from "../../services/music"

Page({
  data: {},
  onLoad() {
    this.fetchAllMenuList()
  },
  // 获取所有的歌单
  async fetchAllMenuList() {
    const res = await getSongMenuTag()
    const tags = res.tags
    const allPromises = []

    // 根据tags去获取对应的歌单
    for (const tag of tags) {
      const promise = getSongMenuList(tag.name)
      allPromises.push(promise)
    }
    Promise.all(allPromises).then(res=>{
      this.setData({songMenus:res})
    })
  }
})