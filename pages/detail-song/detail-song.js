// pages/detail-song/detail-song.js
import recommendStore from "../../store/recommendStore"
import playerStore from "../../store/playerListStore"
import rankingStore from "../../store/rankingStore"
import {
  getMusicPlayListDetail
} from "../../services/music"

Page({
  data: {
    type: 'ranking',
    key: "newRanking",
    songInfos: {},
    id: ""
  },
  onLoad(options) {
    // 确定获取数据的类型
    // type:ranking -> 榜单数据
    // type: recommend -> 推荐数据
    console.log(options)
    const type = options.type
    this.setData({
      type: type
    })
    // this.data.type = type
    if (type === 'ranking') {
      const key = options.key
      this.data.key = key
      rankingStore.onState(key, this.handleRanking)
    } else if (type === "recommend") {
      this.data.key = "recommendSongInfo"
      recommendStore.onState("recommendSongInfo", this.handleRanking)
    } else if (type === "menu") {
      const id = options.id
      this.data.id = id
      this.fetchMenuSongInfo()
    }

  },
  handleRanking(value) {
    console.log(value)
    if (this.data.type === 'recommend') {
      value.name = "推荐歌曲"
    }
    this.setData({
      songInfos: value
    })
    wx.setNavigationBarTitle({
      title: value.name,
    })
  },
  onUnload() {
    if (this.data.type === 'ranking') {
      rankingStore.offState(this.data.key, this.handleRanking)
    } else if (this.data.type === "recommend") {
      recommendStore.offState(this.data.key, this.handleRanking)
    }
  },
  async fetchMenuSongInfo() {
    const res = await getMusicPlayListDetail(this.data.id)
    // console.log(res)
    this.setData({
      songInfos: res.playlist
    })
  },
  // 共享数据
  onSongItemTap() {
    playerStore.setState("playSongList", this.data.songInfos.tracks)
  }

})