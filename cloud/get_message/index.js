// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    // 按时间降序查询，限制最新10个数据
    return await db.collection('m_log').orderBy('date','desc').limit(12).get()
  } catch (error) {
    console.log(error)
  }
}