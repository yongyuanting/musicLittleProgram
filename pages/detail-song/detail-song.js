// pages/detail-song/detail-song.js
import recommendStore from "../../store/recommendStore"
Page({
  data:{
    songs:[]
  },
  onLoad(){
    recommendStore.onState("recommendSongs",(value)=>{
      this.setData({songs:value})
    })
  },
  onUnload(){
    recommendStore.offState("recommendSongs",(value)=>{
      this.setData({songs:value})
    })
  }
})