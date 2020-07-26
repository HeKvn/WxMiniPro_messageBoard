const util = require('../../utils/util');
Page({

  data: {
    historyShow:[],
    totalPage:null
  },

  //下一页(上一页)的点击次数
  sumClick:0,

  //点击显示下一页(上一页)
  historyPage:function(e){
    const _this = this;
    //判断有无上一页
    if(this.sumClick===0&&e.currentTarget.dataset.operation===-1){
      wx.showToast({
        title: '没有上一页',
        icon:'none'
      })
    }else{
      this.sumClick+=e.currentTarget.dataset.operation;
    }
    const sumNext = this.sumClick *20;//20是云函数limit的条件
    wx.cloud.callFunction({
      name:"getHistory",
      data:{
        next:sumNext
      }
    }).then(res=>{
      //判断有无下一页
      if(res.result.data.length===0){
        wx.showToast({
          title: '没有下一页',
          icon:'none'
        })
        //没有的话让之前不小心加的1减回去
        _this.sumClick+=-1;
      }else{
        _this.setData({
          historyShow:res.result.data.map(v=>{
            var date = util.formatTime(new Date(v.date))
            v.date = date 
            return v
          }),
        })
        //点击后回到顶部
        wx.pageScrollTo({
          scrollTop:0
        })
      }
      // console.log(res.result.data.length)
    })

  },

  onShow: function () {
    const _this = this;
    wx.cloud.callFunction({
      name:"getHistory",
      data:{
        next:_this.sumClick
      }
    }).then(res=>{
      _this.setData({
        historyShow:res.result.data.map(v=>{
          var date = util.formatTime(new Date(v.date))
          v.date = date 
          return v
        })
      })
    })
    this.sumClick = 0;
  },
})