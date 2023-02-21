// components/ranking-item/ranking-item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    itemData: {
      type: Object,
      default: {}
    },
    key: {
      type: String,
      default: "newRanking"
    }
  },
  methods: {
    onRankingItemTap() {
      const key = this.properties.key
      wx.navigateTo({
        url: `/pages/detail-song/detail-song?type=ranking&key=${key}`,
      })
    }
  }

})