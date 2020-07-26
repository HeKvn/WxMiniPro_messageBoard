// 云函数入口文件
// 存钱云函数
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    return await db.collection('save_money').add({
      data:{
        money:event.money,
        openid:event.openid,
        date:event.date
      }
    })
  } catch (error) {
    console.log(error)
  }
}