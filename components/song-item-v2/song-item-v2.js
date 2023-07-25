// components/song-item-v2/song-item-v2.js

import {
  favorCollection,
  likeCollection,
  menuCollection
} from "../../database/index"
import menuStore from "../../store/menu"
// const db = wx.cloud.database()
// const cFavor = db.collection('c_favor')
// const cLike = db.collection('c_like')

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
    },
    menuList: {
      type: Array,
      value: []
    }
  },
  behaviors: [],
  methods: {
    onSongItemClick() {
      const id = this.properties.itemData.id
      console.log(id)
      wx.navigateTo({
        url: `/packagePlayer/pages/music-player/music-player?id=${id}`,
      })
    },
    // 展开更多
    onMoreTap() {
      // console.log("点击了更多")
      wx.showActionSheet({
        itemList: ["收藏", "喜欢", "添加到歌单"],
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
          res = await favorCollection.add(this.properties.itemData)
          break;
        case 1: // 喜欢
          res = await likeCollection.add(this.properties.itemData)
          break
        case 2: // 歌单
          const menuNames = this.properties.menuList.map(item => item.name)
          wx.showActionSheet({
            itemList: menuNames,
            success: (res) => {
              const menuIndex = res.tapIndex
              this.handleMenuIndex(menuIndex)
            }
          })
          return
      }
      if (res) {
        wx.showToast({
          title: '添加成功',
        })
      }
    },
    async handleMenuIndex(index) {
      // console.log(index)
      // 1.获取要添加进入的歌单
      const menuItem = this.properties.menuList[index]
      const cmd = wx.cloud.database().command
      // 2.想这个歌单中的songList添加一条数据
      const data = this.properties.itemData
      const res = await menuCollection.update(menuItem._id, {
        songList: cmd.push(data)
      })
      if (res) {
        wx.showToast({
          title: '添加成功',
        })
        menuStore.dispatch("fetchMenuListAction")
      }
    }
  }
})