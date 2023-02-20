// pages/home-music/main-music.js
import {
  querySelect
} from '../../utils/querySelecor'
import {
  getMusicBanner,
  getMusicPlayListDetail,
  getSongMenuList
} from "../../services/music"
import {
  throttle
} from 'underscore'
import rankingStore from "../../store/rankingStore"
import recommendStore from "../../store/recommendStore"
const querySelectThrottle = throttle(querySelect, 100, {
  trailing: false
})
const app = getApp()

Page({

  data: {
    searchValue: "",
    banners: [],
    bannerHeight: 150,
    recommendSongs: [],
    // 热门歌单数据
    hotMenuList: [],
    // 屏幕宽度
    screenWidth: 750,
    recommendMenuList: [],
    // 巅峰榜数据
    rankingInfo: {

    }
  },
  // 监听点击搜索框
  onClickInput() {
    wx.navigateTo({
      url: '/pages/detail-search/detail-search',
    })
  },
  onLoad() {
    this.fetchMusicBanner()
    // this.fetchRecommendSongs()
    // 发起action
    recommendStore.onState("recommendSongs", this.handleRrcommendSong)

    recommendStore.dispatch("fetchRecommendSongsAction")
    rankingStore.onState("newRanking", this.handleNewRanking)
    rankingStore.onState("originRanking", this.handleOriginRanking)
    rankingStore.onState("upRanking", this.handleUpRanking)
    rankingStore.dispatch("fetchRankingDataAction")

    this.fetchHotSongMenuList()
    //  获取屏幕尺寸
    this.setData({
      screenWidth: app.globalData.screenWidth
    })
  },
  async fetchMusicBanner() {
    const res = await getMusicBanner()
    this.setData({
      banners: res.banners
    })
  },
  imagesStandBy(event) {
    // console.log(event)
    // 获取image组件的高度
    // const query = wx.createSelectorQuery()
    // query.select(".banner-image").boundingClientRect()
    // query.exec((res)=>{
    //   // console.log("看看矩形框",res)
    //   this.setData({
    //     bannerHeight:res[0].height
    //   })
    // })
    querySelectThrottle('.banner-image').then(res => {
      this.setData({
        bannerHeight: res[0].height
      })
    })
  },
  // async fetchRecommendSongs(){
  //   const res = await getMusicPlayListDetail(3778678)
  //   console.log(res)
  //   this.setData({recommendSongs:res.playlist.tracks.slice(0,6)})
  // },
  onRecommendMoreClick() {
    // console.log("点了推荐歌曲")
    wx.navigateTo({
      url: '/pages/detail-song/detail-song',
    })
  },
  async fetchHotSongMenuList() {
    // const res = await getSongMenuList()
    // console.log(res)
    getSongMenuList().then(res => {
      this.setData({
        hotMenuList: res.playlists
      })
    })
    getSongMenuList("华语").then(res => {
      this.setData({
        recommendMenuList: res.playlists
      })
    })
  },
  // =================从store中获取数据======================
  handleRrcommendSong(value) {
    this.setData({
      recommendSongs: value.slice(0, 6)
    })
  },
  handleNewRanking(value) {
    console.log('新歌帮', value)
    const newRankingInfos = {
      ...this.data.rankingInfo,
      newRanking: value
    }
    this.setData({
      rankingInfo: newRankingInfos
    })
  },
  handleOriginRanking(value) {
    const originRanking = {
      ...this.data.rankingInfo,
      originRanking: value
    }
    this.setData({
      rankingInfo: originRanking
    })
    console.log('原创帮', value)
  },
  handleUpRanking(value) {
    const upRanking = {
      ...this.data.rankingInfo,
      upRanking: value
    }
    this.setData({
      rankingInfo: upRanking
    })
    console.log('飙升帮', value)
  },


  onUnload() {
    recommendStore.offState("recommendSongs", this.handleRrcommendSong)
  }

})