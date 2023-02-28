// components/nav-bar/nav-bar.js

const app = getApp()


Component({
  options: {
    multipleSlots: true
  },
  data: {
    statusHeight: 20,
    title: "导航标题"
  },
  lifetimes: {
    attached() {
      this.setData({
        statusHeight: app.globalData.statusHeight
      })
    }
  },
  methods: {
    returnNavigate() {
      // wx.InnerAudioContext.destroy()
      // wx.onAudioInterruptionEnd()
      // wx.navigateBack()
      this.triggerEvent("leftClick")
    }
  }
})