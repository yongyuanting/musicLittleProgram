// components/video_item/video_item.js
Component({
 properties:{
  itemData:{
    type:Object,
    value:{}
  }
 },
 methods:{
  //  2.第二种方法
  onItemTap(){
    const item = this.properties.itemData
    wx.navigateTo({
      url: `/pages/detail_video/detail_video?id=${item.id}`,
    })
  }
 }
})
