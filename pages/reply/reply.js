const util = require('../../utils/util');

Page({
  data: {
    log:[],
    reply:[]
  },

  //数据库中每条数据的id
  id:null,

  onLoad: function (options) {
    this.id = options.message_id;
  },

  onShow: function(){
    const _this = this;
    wx.cloud.callFunction({
      name:"replyPage",
      data:{
        //请一定要注意 是“：”不是“=”！这个粗心的点浪费了自己半个小时了！！！
        id : _this.id
      }
    }).then(res=>{
      _this.setData({
        log:res.result.data.map(v=>{
          var date = util.formatTime(new Date(v.date))
          v.date = date
          return v
        })
      })
    })
    this.getReply();
  },

  getReply:function(){
    const _this = this;
    wx.cloud.callFunction({
      name:"getReply",
      data:{
        id:_this.id
      }
    }).then(res=>{
      _this.setData({
        reply:res.result.data.map(v=>{
          var date = util.formatTime(new Date(v.date))
          v.date = date
          return v
        })
      })
    })
  },

  send:function(e){
    const _this = this;
    const ui = wx.getStorageSync('userinfo')
    wx.cloud.callFunction({
      name:"SendReply",
      data:{
        message:e.detail.value,
        date:Date.now(),
        replyid:_this.id,
        name:ui.nickName,
        avatar:ui.avatarUrl
      }
    }).then(res=>{
      _this.setData({
        reply_value:""
      })
      _this.getReply();
    })
  }

})