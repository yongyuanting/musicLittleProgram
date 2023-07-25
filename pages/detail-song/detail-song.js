// pages/detail-song/detail-song.js
import recommendStore from "../../store/recommendStore"
import playerStore from "../../store/playerListStore"
import rankingStore from "../../store/rankingStore"
import menuStore from "../../store/menu"
import {
  getMusicPlayListDetail
} from "../../services/music"

const db = wx.cloud.database()

Page({
  data: {
    type: 'ranking',
    key: "newRanking",
    songInfos: {},
    id: "",
    menuList: []
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
    } else if (type === "profile") {
      // 个人中心
      const tabname = options.tabname
      const title = options.title
      this.handleProfileTabInfo(tabname, title)
    }
    // 歌单数据
    menuStore.onState("menuList", this.handleMenuList)

  },
  handleRanking(value) {
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

  // 个人列表处理
  async handleProfileTabInfo(tabname, title) {
    // console.log(tabname)
    // 1.动态获取集合
    const collection = db.collection(`c_${tabname}`)
    const res = await collection.where({
      _openid: wx.getStorageSync('openid')
    }).get()
    // console.log(res)
    this.setData({
      songInfos: {
        name: title,
        tracks: res.data
      }
    })
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
  },
  // 歌单数据
  handleMenuList(value) {
    this.setData({
      menuList: value
    })
  }


})