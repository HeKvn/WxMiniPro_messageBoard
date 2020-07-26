const util = require('../../utils/util');
Page({
  data: {

  },

  onShow:function(){

  },

  //提交表单
  handleSubmit:function(e){
    //把对象转换成数组，等下方便遍历判断
    var value = [];
    var allTrue = true;
    for(let i in e.detail.value){
      value.push(e.detail.value[i]);
    }
    value.forEach(v=>{
      // console.log(v)
      if(!v){
        allTrue = false
      }
    })
    //没有空的才给提交
    if(allTrue){
      const _this = this;
      var time = util.formatTime(new Date());
      const ui = wx.getStorageSync('userinfo');
      wx.cloud.callFunction({
        name:"writeMoney",
        data:{
          money:e.detail.value.money,
          date:time,
          payObj:e.detail.value.payObj,
          ps:e.detail.value.ps,
          type:e.detail.value.radio_group,
          name:ui.nickName
        }
      }).then(res=>{
        _this.reset();
      })
    }else{
      wx.showToast({
        title: '妙妙屋不记不明之账',
        icon: 'none'
      })
    }
    // console.log(e.detail.value)
  },

  reset:function(e){
    this.setData({
      money:"",
      obj:"",
      ps:""
    })
  }
})