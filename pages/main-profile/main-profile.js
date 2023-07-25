// pages/main-profile/main-profile.js

import {
  menuCollection
} from "../../database/index"

import menuStore from "../../store/menu"

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
    }],
    isShowDialog: false,
    menuName: "",
    menuList: []
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
    // 共享歌单数据
    menuStore.onState("menuList", this.handleMenuList)
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
  },
  // 点击跳转
  onTabItemTap(event) {
    // console.log(event)
    const item = event.currentTarget.dataset.item
    console.log(item)
    wx.navigateTo({
      url: `/pages/detail-song/detail-song?type=profile&tabname=${item.type}&title=${item.name}`,
    })
  },
  // 新建歌单
  onPlusTap() {
    this.setData({
      isShowDialog: true
    })
  },
  // 新建歌单点击确定
  async onConfirmTap() {
    const menuName = this.data.menuName

    // 2.模拟歌单数据
    const menuRecord = {
      name: menuName,
      songList: []
    }
    // 将歌单记录添加到数据库中
    const res = await menuCollection.add(menuRecord)
    if (res) {
      wx.showToast({
        title: '添加成功',
      })
      menuStore.dispatch("fetchMenuListAction")
    }
  },
  // 数据共享的代码
  handleMenuList(value) {
    // console.log(value)
    this.setData({
      menuList: value
    })
  },

})