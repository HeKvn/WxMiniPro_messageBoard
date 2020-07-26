// pages/scenario/scenario.js
Page({
  data: {

  },
  
  //去往垃圾桶
  gotoHistory:function(){
    wx.navigateTo({
      url: '../history/history'
    })
  }
})