// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    return await db.collection('m_money').add({
      data:{
        money:event.money,
        date:event.date,
        payObj:event.payObj,
        ps:event.ps,
        type:event.type,
        name:event.name
      }
    })
  } catch (error) {
    console.log(error)
  }
}