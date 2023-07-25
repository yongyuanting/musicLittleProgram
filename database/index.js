// 对数据库的增删改查进行封装

const db = wx.cloud.database()

class yytCollection {
  constructor(collectionName) {
    this.collection = db.collection(collectionName)
  }
  // 增加
  add(data) {
    return this.collection.add({
      data
    })
  }
  delete(condition, isDoc = true) {
    if (isDoc) {
      return this.collection.doc(condition).remove()
    } else {
      this.collection.where(condition).remove()
    }
  }
  update(condition, data, isDoc = true) {
    if (isDoc) {
      return this.collection.doc(condition).update({
        data
      })
    } else {
      return this.collection.where(condition).update({
        data
      })
    }
  }
  query(condition = {}, offset = 0, size = 20, isDoc = false) {
    if (isDoc) {
      return this.collection.doc(condition).get()
    } else {
      return this.collection.where(condition).skip(offset).limit(size).get()
    }
  }
}
export const favorCollection = new yytCollection("c_favor")
export const likeCollection = new yytCollection("c_like")
export const historyCollection = new yytCollection("c_history")
export const menuCollection = new yytCollection("c_menu")