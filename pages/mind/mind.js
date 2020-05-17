
Page({
  data: {
    userinfo:{},
    openid:null
  },

  onLoad: function (options) {
    // 从缓存获取用户信息
    const ui = wx.getSystemInfoSync('userinfo')
    this.setData({
      userinfo:ui,
      openid:ui.openid
    })
  },

  login:function(e){
    var _this = this
    wx.cloud.callFunction({
      name:"login",
      // success:res=>{
      //   console.log(res)
      // }
      success:res=>{
        _this.setData({
          openid:res.result.openid,
          userinfo:e.detail.userInfo
        })
        _this.data.userinfo.openid=_this.data.openid
        console.log(_this.data.userinfo)
        wx.setStorageSync('userinfo', _this.data.userinfo)
      },
      fail:res=>{
        console.log("fail")
      }
    })
  }

})