const util = require('../../utils/util')
Page({
  data: {
    message:null,
    m_logs:[]
  },

  Message:function(e){
    this.data.message=e.detail.value;
  },

  // 添加便签数据
  addMessage:function(){
    const _this = this
    var temp = _this.data.message
    if(temp==null||temp==""){
      wx.showModal({
        title:'提示',
        content:'请输入内容^^',
        cancelColor: '#000000',
      })
    }else{
      // 获取缓存中的用户信息
      const ui = wx.getStorageSync('userinfo')
      if(!ui.openid){
        wx.switchTab({
          url: '/pages/mind/mind',
        })
      }else{
        wx.cloud.callFunction({
          name:"create_m_logs",
          data:{
            message:temp,
            date:Date.now(),
            openid:ui.openid,
            name:ui.nickName,
            avatar:ui.avatarUrl
          }
        })
        // 成功添加后重新刷新页面
        _this.onShow();
        _this.getMessage();
        //成功后删除输入框数据
        _this.data.message=null
      }
    }
  },

  // 获取便签内容
  getMessage:function(){
    const _this = this
    const ui = wx.getStorageSync('userinfo')
    if(!ui.openid){
      wx.switchTab({
        url: '/pages/mind/mind',
      })
    }else{
      wx.cloud.callFunction({
        name:"get_message",
        success:res=>{
          _this.setData({
            m_logs:res.result.data.map(log=>{
              var date = util.formatTime(new Date(log.date))
              log.date = date
              return log
            })
          })
        },
        fail:res=>{
          console.log("fail")
        }
      })
    }
  },

  onShow: function () {
    this.getMessage();
  },

})
