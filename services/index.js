class YYTRequest{
  constructor(baseUrl){
    this.baseUrl = baseUrl
  }
  request(options){
    const{url} = options
    return new Promise((resolve,reject) => {
      wx.request({
        ...options,
        url:this.baseUrl+url,
        success:(res)=>{
          resolve(res.data)
        },
        fail:reject
      })
    })
  }
    get(options) {
      return this.request({...options,method:"get"})
    }
    post(options) {
      return this.request({...options,method:'post'})
    }
}

export const yytRequest = new YYTRequest("http://codercba.com:9002/")