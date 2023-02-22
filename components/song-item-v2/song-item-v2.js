// components/song-item-v2/song-item-v2.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    itemData: {
      type: Object,
      default: {}
    },
    index: {
      type: Number,
      default: -1
    }
  },
  behaviors: [],
  methods: {
    onSongItemClick() {
      const id = this.properties.itemData.id
      console.log(id)
      wx.navigateTo({
        url: `/pages/music-player/music-player?id=${id}`,
      })
    }
  }
})