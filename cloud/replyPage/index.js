// 云函数入口文件
//获取回复页面的  被  回复信息
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    return await db.collection('m_log').where({
      _id:event.id
    }).get()
  } catch (error) {
    console.log(error);
  }
}