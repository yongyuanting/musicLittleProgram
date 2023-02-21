// components/menu-area/menu-area.js
const app = getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: '默认歌单'
    },
    menuList: {
      type: Array,
      value: []
    }
  },
  data: {
    screenWidth: 375
  },
  lifetimes: {
    ready() {
      this.setData({
        screenWidth: app.globalData.screenWidth
      })
    }
  },
  methods: {
    onMenuMoreClick() {
      // console.log('点了了更多')
      wx.navigateTo({
        url: '/pages/detail-menu/detail-menu',
      })
    }
  }
})