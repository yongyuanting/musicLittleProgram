// components/nav-bar/nav-bar.js

const app = getApp()


Component({
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
  }
})