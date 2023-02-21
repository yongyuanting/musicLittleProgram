// components/menu-item/menu-item.js
Component({
  properties: {
    itemData: {
      type: Object,
      default: {}
    }
  },
  methods: {
    onMenuItemTap() {
      // console.log(this.properties.itemData.id)
      wx.navigateTo({
        url: `/pages/detail-song/detail-song?type=menu&id=${this.properties.itemData.id}`,
      })
    }
  }
})