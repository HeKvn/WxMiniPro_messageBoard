const util = require('../../utils/util');
import {users} from "../../utils/usersOpenid.js"
Page({
  data: {
    navbar:['支出明细','存钱罐'],
    currentTab:0,
    text:'<',
    animation:null,
    isRuleTrue:false,
    totalPrice:0,
    moneyMessage:[],
    // 存钱罐柱状图数据
    weiHeight:60,
    liangHeight:10,
    qiHeight:10,
    kunHeight:10,
    diHeight:10,
    hongHeight:10,
    //初始化隐藏模态输入框
    hiddenmodalput: true,
    //存入的金额
    inputMoney:null,
    //定义一个柱状图数组
    contribution:[],
    //总存款
    sum:0
  },

  //选项卡
  navbarTap:function(e){
    // console.log(e)
    this.setData({
      currentTab:e.currentTarget.dataset.idx
    })
  },

  onShow: function () {
    // console.log(this.data.navbar);
    const _this = this;
    let totalPrice = null;
    wx.cloud.callFunction({
      name:"getMoney",
    }).then(res=>{
      _this.setData({
        moneyMessage:res.result.data
      })
      _this.data.moneyMessage.forEach(v=>{
        totalPrice+=parseFloat(v.money);
      })
      _this.setData({
        totalPrice
      })
    })
  },

  handleWrite:function(){
    wx.navigateTo({
      url: '/pages/WriteMoney/WriteMoney',
    })
  },

  onReady:function(){
    this.animation = wx.createAnimation();
  },

  translate: function () {
    this.setData({
      isRuleTrue: true
    })
    this.animation.translate(-245, 0).step()
    this.setData({ 
      animation: this.animation.export() 
    })
  },

  success: function () {
    this.setData({
      isRuleTrue: false
    })
    this.animation.translate(0, 0).step()
    this.setData({ 
      animation: this.animation.export()
    })
  },

  //筛选页面数据提交
  handleSubmit:function(){
    wx.showToast({
      title: '该功能暂未开放^^',
      icon:'none'
    })
  },

  //点击弹出（消失）模拟输入框
  modalinput: function (){
    this.setData({
    //注意到模态框的取消按钮也是绑定的这个函数，
    //所以这里直接取反hiddenmodalput，也是没有毛病
    hiddenmodalput: !this.data.hiddenmodalput
    })
  },

  //获取输入框输入的数据
  inputMoney:function(e){
    this.data.inputMoney = e.detail.value;
  },

  //点击确认的方法
  confirm:function(){
    const _this = this;
    const ui = wx.getStorageSync('userinfo');
    var time = util.formatTime(new Date());
    if(this.data.inputMoney===""){
      wx.showToast({
        title: '请输入金额',
        icon:'none'
      })
    }else{
      wx.cloud.callFunction({
        name:"saveMoney",
        data:{
          money:_this.data.inputMoney,
          openid:ui.openid,
          date:time
        }
      }).then(res=>{
        _this.setData({
          input_value:"",
          inputMoney:"",
          hiddenmodalput: !this.data.hiddenmodalput
        })
      })
    }
  },

  //获取柱状图数据
  getContribution:function(){
    var openid = new users();
    const _this = this;
    wx.cloud.callFunction({
      name:"getContribution"
    }).then(res=>{
      _this.setData({
        contribution:res.result.data
      })
    })
    
    this.data.contribution.forEach(v=>{
      this.data.sum += parseInt(v.money);
      if(openid[0]===v.openid){
        _this.setData({
          kunHeight:_this.data.kunHeight+=parseInt(v.money)
        })
      }
      if(openid[1]===v.openid){
        _this.setData({
          hongHeight:_this.data.hongHeight+=v.money
        })
      }
    })
    
  },

  test:function(){
    this.getContribution();
    this.setData({
      // kunHeight:440*(this.data.kunHeight/this.data.sum) 可以试试从云函数解决或是现在onshow里算好
    })
  }
})