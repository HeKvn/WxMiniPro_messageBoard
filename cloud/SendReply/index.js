// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    return await db.collection('reply').add({
      data:{
        message:event.message,
        date:event.date,
        replyid:event.replyid,
        name:event.name,
        pic:event.avatar
      }
    })
  } catch (error) {
    console.log(error);
  }
}