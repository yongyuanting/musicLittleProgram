// components/song-item-v2/song-item-v2.js

const db = wx.cloud.database()
const cFavor = db.collection('c_favor')
const cLike = db.collection('c_like')

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
    },
    // 展开更多
    onMoreTap() {
      // console.log("点击了更多")
      wx.showActionSheet({
        itemList: ["收藏", "喜欢"],
        success: (res) => {
          // console.log(res)
          const index = res.tapIndex
          this.handleOperationResult(index)
        }
      })
    },
    // 点击了展开的更多
    async handleOperationResult(index) {
      let res = null
      switch (index) {
        case 0: // 收藏
          res = await cFavor.add({
            data: this.properties.itemData
          })
          break;
        case 1: // 喜欢
          res = await cLike.add({
            data: this.properties.itemData
          })
          break
      }
      if (res) {
        wx.showToast({
          title: '添加成功',
        })
      }
    }
  }
})