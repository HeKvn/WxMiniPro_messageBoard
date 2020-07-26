// 云函数入口文件
//获取贡献榜
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    return await db.collection('save_money').get();
  } catch (error) {
    console.log(error)
  }
}