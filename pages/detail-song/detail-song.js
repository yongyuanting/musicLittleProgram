// pages/detail-song/detail-song.js
import recommendStore from "../../store/recommendStore"
Page({
  data: {
    songs: []
  },
  onLoad() {
    recommendStore.onState("recommendSongs", this.handleRecomendSong)
  },
  onUnload() {
    recommendStore.offState("recommendSongs", this.handleRecomendSong)
  },
  handleRecomendSong(value) {
    this.setData({
      songs: value
    })
  }
})