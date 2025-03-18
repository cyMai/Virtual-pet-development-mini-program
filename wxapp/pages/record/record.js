// pages/record/record.js
import { getFocusRecord, getActivityRecords, getGameRecords } from '../../api/apis'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    records: [],
    activityRecords: [],
    gameRecords: [],
    todayTime: 0,
    todayCount: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.getRecords()
    this.getActivityRecords()
    this.getGameRecords()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  getGameRecords() {
    const userInfo = wx.getStorageSync('userinfo')
    if(userInfo) {
      getGameRecords({
        userId: userInfo.id
      }).then(res => {
        this.setData({
          gameRecords: res
        })
      })
    }
  },
  getActivityRecords() {
    const userInfo = wx.getStorageSync('userinfo')
    if(userInfo) {
      getActivityRecords({
        userId: userInfo.id
      }).then(res => {
        this.setData({
          activityRecords: res
        })
      })
    }
  },

  // 获取专注记录
  getRecords() {
    const userInfo = wx.getStorageSync('userinfo')
    if(userInfo) {
      getFocusRecord({
        userId: userInfo.id
      }).then(res => {
        if(res) {
          // 过滤出今天的记录
          const today = new Date().toISOString().split('T')[0]
          const todayRecords = res.filter(item => 
            item.createdTime.startsWith(today)
          )
          
          // 计算今日总时长和次数
          const totalTime = todayRecords.reduce((sum, item) => 
            sum + item.focusTime, 0
          )
          
          this.setData({
            records: todayRecords,
            todayTime: totalTime,
            todayCount: todayRecords.length
          })
        }
      })
    }
  }
})