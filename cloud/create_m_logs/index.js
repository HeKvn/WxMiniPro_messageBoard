// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    return await db.collection('m_log').add({
      data:{
        message:event.message,
        date:event.date,
        openid:event.openid,
        name:event.name,
        pic:event.avatar
      }
    })
  } catch (error) {
    console.log(error)
  }
}