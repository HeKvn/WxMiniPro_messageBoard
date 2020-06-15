const util = require('../../utils/util');
Page({

  data: {
    history:[]
  },

  onShow: function () {
    const _this = this
    wx.cloud.callFunction({
      name:"getHistory"
    }).then(res=>{
      _this.setData({
        history:res.result.data.map(log=>{
          var date = util.formatTime(new Date(log.date))
          log.date = date
          return log
        })
      })
    })
  },

})