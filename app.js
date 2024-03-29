// app.js
App({
  globalData: {
    screenWidth: 375,
    screenHeight: 667,
    statusHeight: 20,
    swiperContentHeight: 500
  },
  onLaunch() {
    // 获取设备信息
    wx.getSystemInfo({
      success: (res) => {
        this.globalData.screenWidth = res.screenWidth
        this.globalData.screenHeight = res.screenHeight
        this.globalData.statusHeight = res.statusBarHeight
        this.globalData.swiperContentHeight = res.screenHeight - res.statusBarHeight - 44
      }
    })
    // 对云开发能力初始化
    wx.cloud.init({
      env: "cloud1-7gijnryg2f3c62b2"
    })
  }
})