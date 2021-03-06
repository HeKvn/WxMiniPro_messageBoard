// 云函数入口文件
//回复页面的回复信息
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    return await db.collection('reply').where({replyid:event.id}).orderBy('date','desc').get()
  } catch (error) {
    console.log(error);
  }
}