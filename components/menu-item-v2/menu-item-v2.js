// components/menu-item-v2/menu-item-v2.js

import {
  menuCollection
} from "../../database/index"
import menuStore from "../../store/menu"

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    itemData: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 使用catch，因为item也可以点击，不需要冒泡
    async onDeleteTap() {
      // 1.获取点击歌单的_id
      const _id = this.properties.itemData._id
      const res = await menuCollection.delete(_id)
      if (res) {
        wx.showToast({
          title: '删除成功',
        })
        menuStore.dispatch("fetchMenuListAction")
      }
    }
  }
})