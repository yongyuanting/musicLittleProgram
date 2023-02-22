// pages/music-player/music-player.js
import {
  getSongDetail,
  getSongLyric
} from "../../services/player"


Page({
  data: {
    id: "",
    currentSong: {},
    LyricString: "",
    statusHeight: 20
  },
  onLoad(options) {
    // 0 获取设备信息
    this.setData({
      statusHeight: app.globalData.statusHeight
    })
    // 1.获取传入的id
    const id = options.id
    this.setData({
      id: id
    })
    // 2.根据id获取歌曲数据
    getSongDetail(id).then(res => {
      // console.log(res)
      this.setData({
        currentSong: res.songs[0]
      })
    })
    // 3.根据ID获取歌词
    getSongLyric(id).then(res => {
      console.log(res);
      this.setData({
        LyricString: res.lrc.lyric
      })
    })
  }
})