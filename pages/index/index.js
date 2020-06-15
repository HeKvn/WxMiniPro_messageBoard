const util = require('../../utils/util');
import {users} from "../../utils/usersOpenid.js"
Page({
  data: {
    message:null,
    m_logs:[]
  },

  Message:function(e){
    this.data.message=e.detail.value;
    // console.log(e)
  },

  // 添加便签数据
  addMessage:function(){
    const _this = this
    //调用方法，订阅消息提醒开始
    this.requestSubscribe();
    //订阅消息提醒结束
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
        //传入用户的openid
        var openid = new users();
        openid.forEach(item =>{
          //发送订阅消息
          _this.sendSubscribe(item);
          // console.log(item)
        });
      }
    }
    //经测试 若要成功后直接清空输入框的value值，给标签绑定value数组最优解
    _this.setData({
      t_value:"",
      message:""
    });
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
          // console.log(res.result)
        },
        fail:res=>{
          console.log("fail")
        },
      })
    }
  },

  onShow: function () {
    this.getMessage();
  },

  //获取用户订阅消息授权
  requestSubscribe:function(){
    wx.requestSubscribeMessage({
      tmplIds: [
        'vNSCYqfCoGyKDZo4A05Yv86osntMjY5lNkmWV8DEYgo', //收到留言模板id
        'Ej8f0KRj_5gbw0pNCJoiF7sJk3HQeRkZW8fXC03H8Js' //收到回复模板id
      ],
    })
    // console.log("结束订阅消息")
  },

  //发送订阅消息给用户
  sendSubscribe:function(item){
    const ui = wx.getStorageSync('userinfo');
    var time = util.formatTime(new Date());
    var text = this.data.message;
    wx.cloud.callFunction({
      name:"send_subscribeMessage01",
      data:{
        openid:item,
        name:ui.nickName,
        time:time,
        message:text
      }
    }).then(res=>{ //用.then这样的写法会好一些
      // console.log("发送成功",res)
    }).catch(res=>{
      console.log("发送失败",res)
    })
  }

})
