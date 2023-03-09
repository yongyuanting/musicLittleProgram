// pages/music-player/music-player.js
import {
  getSongDetail,
  getSongLyric
} from "../../../services/player"
import {
  collect,
  throttle
} from 'underscore'

import {
  parseLyric
} from "../../../utils/parse_lyric"

import playerStore, {
  audioContext
} from "../../../store/playerListStore"

const app = getApp()

Page({
  data: {
    id: "",
    currentSong: {},
    currentTime: 0,
    durationTime: 0,
    lyricInfos: [],
    currentLyricIndex: -1,
    currentLyricText: "",
    showLyric: "",
    isPlay: true,
    playSongIndex: 0,
    playSongList: [],
    playModelIndex: 0, // 0 顺序播放，1单曲循环，2随机播放

    contentHeight: 0,
    sliderValue: 0,
    pageTitles: ['歌曲', '歌词'],
    currentPage: 0,
    statusHeight: 20,
    isSliderChange: false,
    scrollTopHeight: 800,
    statesKeys: ["id", "currentSong", "durationTime", "currentTime", "lyricInfos", "showLyric", "currentLyricIndex", "isPlaying", "playModelIndex"]

  },
  onLoad(options) {
    // 0 获取设备信息
    this.setData({
      statusHeight: app.globalData.statusHeight,
      contentHeight: app.globalData.swiperContentHeight
    })
    if (options.id) {
      playerStore.dispatch("playMusicWithSongId", options.id)
    }
    // 5.监听是否在等待
    audioContext.onWaiting(() => {
      audioContext.pause()
    })
    // 6.获取store共享数据
    playerStore.onStates(["playSongList", "playSongIndex"], this.getPlaySongListHandle)
    playerStore.onStates(this.data.statesKeys, this.getPlayerInfosHandle)
  },


  updateProgress: throttle(function (currentTime) {
    if (this.data.isSliderChange) return
    // 记录当前时间
    this.setData({
      currentTime,
      sliderValue: (currentTime / this.data.durationTime) * 100
    })
  }, 800),

  // 轮播图切换事件
  onSwiperChange(event) {
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
    // 1.获取点击滑块对应的值
    const value = event.detail.value
    // 2.计算后，将currentTime设置    需要节流
    const currentTime = value / 100 * this.data.durationTime
    audioContext.seek(currentTime / 1000)
    this.setData({
      currentTime,
      isSliderChange: false,
      sliderValue: value
    })

    if (this.data.isPlay === true) {
      audioContext.onCanplay(() => {
        audioContext.play()
      })
    } else {
      audioContext.pause()
    }
  },
  // 点击上一首
  onPrevBtnTap() {
    // this.changeNewSong(false)
    playerStore.dispatch("playNewMusicAction", false)
  },
  // 点击下一首
  onNextBtnTap() {
    // this.changeNewSong(true)
    playerStore.dispatch("playNewMusicAction", true)

  },
  // 返回上一页
  onNavBack() {
    wx.navigateBack({
      detail: 0
    })
  },

  // 滑动，不点击进度条

  // 滑动，不点击进度条 节流
  onSliderChanging: throttle(function (event) {
    if (this.data.isPlay === false) {
      audioContext.pause()
    }
    // 获取滑动的位置
    const value = event.detail.value
    // 根据当前的值，计算出对应的时间  需要节流
    const currentTime = value / 100 * this.data.durationTime
    this.setData({
      currentTime
    })
    // 当前正在滑动
    this.data.isSliderChange = true
  }, 100),
  // 暂停歌曲
  musicPauseOrPlay() {
    playerStore.dispatch("playMusicStatusAction")
  },
  // store共享数据
  getPlaySongListHandle({
    playSongList,
    playSongIndex
  }) {
    // console.log(value)
    if (playSongList) {
      this.setData({
        playSongList
      })
    }
    if (playSongIndex !== undefined) {
      this.setData({
        playSongIndex
      })
    }
  },
  onModeBtnTap() {
    playerStore.dispatch("playMusicModelAction")
  },
  getPlayerInfosHandle({
    id,
    currentSong,
    durationTime,
    currentTime,
    lyricInfos,
    showLyric,
    currentLyricIndex,
    isPlaying,
    playModelIndex
  }) {
    if (id !== undefined) {
      this.setData({
        id
      })
    }
    if (currentSong) {
      this.setData({
        currentSong
      })
    }
    if (durationTime !== undefined) {
      this.setData({
        durationTime
      })
    }
    if (currentTime !== undefined) {
      this.updateProgress(currentTime)
    }
    if (lyricInfos) {
      this.setData({
        lyricInfos
      })
    }
    if (showLyric) {
      this.setData({
        showLyric
      })
    }
    if (currentLyricIndex !== undefined) {
      this.setData({
        currentLyricIndex,
        scrollTopHeight: currentLyricIndex * 35
      })
    }
    if (isPlaying !== undefined) {
      this.setData({
        isPlay: isPlaying
      })
    }
    if (playModelIndex !== undefined) {
      this.setData({
        playModelIndex
      })
    }
  },
  onUnload() {
    playerStore.offStates(["playSongList", "playSongIndex"], this.getPlaySongListHandle)
    playerStore.offStates(this.data.statesKeys, this.getPlayerInfosHandle)
  }
})