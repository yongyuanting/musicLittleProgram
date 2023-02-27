// pages/music-player/music-player.js
import {
  getSongDetail,
  getSongLyric
} from "../../services/player"
import {
  throttle
} from 'underscore'

import {
  parseLyric
} from "../../utils/parse_lyric"

import playerStore from "../../store/playerListStore"

const app = getApp()
// 创建播放器，没必要每次进入就创建
const audioContext = wx.createInnerAudioContext()

Page({
  data: {
    id: "",
    currentSong: {},
    lyricInfos: "",
    statusHeight: 20,
    currentPage: 0,
    contentHeight: 0,
    pageTitles: ['歌曲', '歌词'],
    currentTime: 0,
    durationTime: 0,
    sliderValue: 0,
    isSliderChange: false,
    isPlay: true,
    showLyric: "",
    currentLyricIndex: -1,
    scrollTopHeight: 800
  },
  onLoad(options) {
    // 0 获取设备信息
    this.setData({
      statusHeight: app.globalData.statusHeight,
      contentHeight: app.globalData.swiperContentHeight
    })
    // 1.获取传入的id
    const id = options.id
    this.setData({
      id: id
    })
    // 2.1根据id获取歌曲数据
    getSongDetail(id).then(res => {
      // console.log(res)
      this.setData({
        currentSong: res.songs[0],
        durationTime: res.songs[0].dt
      })
    })
    // 2.2根据ID获取歌词
    getSongLyric(id).then(res => {
      // console.log(res);
      const lrcString = res.lrc.lyric
      const lyricInfo = parseLyric(lrcString)
      // console.log(lyricInfo)
      // console.log(lrcString)
      this.setData({
        lyricInfos: lyricInfo
      })
    })
    // 3.播放当前歌曲
    audioContext.src = `https://music.163.com/song/media/outer/url?id=${id}.mp3`
    audioContext.autoplay = true
    // audioContext.onCanplay()

    // 4.监听播放时间
    audioContext.onTimeUpdate(() => {
      // 4.1 更新歌曲的进度
      const throttleUpdateProgress = throttle(this.updateProgress, 1000)
      if (!this.data.isSliderChange) {
        throttleUpdateProgress()
      }
      // 4.2 匹配正确的歌词
      if (!this.data.lyricInfos.length) return
      let index = this.data.lyricInfos.length - 1
      for (let i = 0; i < this.data.lyricInfos.length; i++) {
        const info = this.data.lyricInfos[i]
        if (info.time > audioContext.currentTime * 1000) {
          index = i - 1
          break;
        }
      }
      // 匹配次数太多了，优化
      if (this.data.currentLyricIndex === index) {
        return
      } else {
        // 获取歌词索引和文本
        // 改变歌词滚动页面的位置
        const currentLyric = this.data.lyricInfos[index].text
        this.setData({
          showLyric: currentLyric,
          currentLyricIndex: index,
          scrollTopHeight: 35 * index
        })
      }
    })
    // 5.监听是否在等待
    audioContext.onWaiting(() => {
      audioContext.pause()
    })
    // 6.获取store共享数据
    playerStore.onState("playSongList", this.getPlaySongListHandle)
  },

  updateProgress() {
    // 记录当前时间
    // console.log("onTimeUpdate", audioContext.currentTime)
    this.setData({
      currentTime: audioContext.currentTime * 1000,
      sliderValue: (this.data.currentTime / this.data.durationTime) * 100
    })
  },

  // 轮播图切换事件
  onSwiperChange(event) {
    // console.log(event)
    this.setData({
      currentPage: event.detail.current
    })
  },
  // 点击歌词歌曲
  onSwiperClick(event) {
    const index = event.currentTarget.dataset.index
    this.setData({
      currentPage: index
    })
  },
  // 滑动点击歌曲条
  onSliderChange(event) {
    // console.log(event)
    // 1.获取点击滑块对应的值
    const value = event.detail.value
    // 2.计算后，将currentTime设置
    const currentTime = value / 100 * this.data.durationTime
    audioContext.seek(currentTime / 1000)
    this.setData({
      currentTime,
      isSliderChange: false,
      sliderValue: value
    })
    if (this.data.isPlay === true) {
      console.log("进入可播放")
      audioContext.onCanplay(() => {
        audioContext.play()
      })
    } else {
      console.log("进入不可aspiofjioasj播放")
      audioContext.pause()
    }
  },
  // 滑动，不点击进度条
  onSliderChanging(event) {
    if (this.data.isPlay === false) {
      audioContext.pause()
    }
    // 获取滑动的位置
    const value = event.detail.value
    // 根据当前的值，计算出对应的时间
    const currentTime = value / 100 * this.data.durationTime
    this.setData({
      currentTime
    })
    // 当前正在滑动
    this.data.isSliderChange = true
  },
  // 暂停歌曲
  musicPauseOrPlay() {
    if (this.data.isPlay === true && !audioContext.paused) {
      audioContext.pause()
      // this.data.isPlay = false
      this.setData({
        isPlay: false
      })
    } else if (this.data.isPlay === false && audioContext.paused) {
      audioContext.play()
      // this.data.isPlay = true
      this.setData({
        isPlay: true
      })
    }
  },
  // store共享数据
  getPlaySongListHandle(value) {
    console.log(value)
  },
  onUnload() {
    playerStore.offState("playSongList", this.getPlaySongListHandle)
  }
})