// pages/activity/activity.js
import { getPet, activityRecord, getActivityRecords } from "../../api/apis"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    petInfo: null,
    showResult: false,
    result: null,
    activityRecords: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getPetInfo()
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
    this.getPetInfo()
    this.getActivityRecords()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  getPetInfo() {
    const userInfo = wx.getStorageSync('userinfo')
    if(userInfo) {
      getPet({
        userId: userInfo.id
      }).then(res => {
        if(res) {
          this.setData({
            petInfo: res
          })
        }
      })
    }
  },

  startActivity() {
    activityRecord({
      id: this.data.petInfo.id,
      userId: wx.getStorageSync('userinfo').id
    }).then(res => {
      if (!res.success) {
        wx.showToast({
          title: res.message,
          icon: 'none'
        })
        return;
      }
      
      this.setData({
        showResult: true,
        result: res
      })
      
      this.getPetInfo()
      
      // 显示剩余次数
      if (res.remainingCount >= 0) {
        wx.showToast({
          title: `今日还剩${res.remainingCount}次机会`,
          icon: 'none'
        })
      }
    })
  },

  closeResult() {
    this.setData({
      showResult: false,
      result: null
    })
    // 关闭结果弹窗时也重新获取一次宠物信息
    this.getPetInfo()
  },

  getActivityRecords() {
    if(this.data.petInfo) {
      getActivityRecords({
        petId: this.data.petInfo.id
      }).then(res => {
        if(res) {
          this.setData({
            activityRecords: res
          })
        }
      })
    }
  }
})