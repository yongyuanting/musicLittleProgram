// pages/main-profile/main-profile.js
Page({
  data: {
    isLogin: false,
    userInfo: {},
    tabs: [{
      name: '我的收藏',
      type: 'favor'
    }, {
      name: '我的喜欢',
      type: 'like'
    }, {
      name: '历史记录',
      type: 'history'
    }]
  },
  onLoad() {
    // 判断用户是否登录
    const openid = wx.getStorageSync('openid')
    const userInfo = wx.getStorageSync('userinfo')
    this.setData({
      isLogin: !!openid
    })
    if (this.data.isLogin) {
      this.setData({
        userInfo
      })
    }
  },
  // 点击用户登录
  async onUserInfoTap() {
    // 1.获取用户头像和昵称
    const profile = await wx.getUserProfile({
      desc: '获取您的头像和昵称',
    })
    this.setData({
      userInfo: profile.userInfo
    })
    // 2.获取用户openId
    const result = await wx.cloud.callFunction({
      name: "musicLogin"
    })
    // console.log(result)
    const openId = result.result.openid
    // 3.保存到本地
    wx.setStorageSync('openid', openId)
    wx.setStorageSync('userinfo', profile.userInfo)
    this.setData({
      isLogin: true
    })
  }
})