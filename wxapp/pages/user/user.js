// pages/my/my.js
import { getPet, getUserInfo } from "../../api/apis"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo: {},
    userInfo: {},
    petInfo: null
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
  toMyPet() {
    wx.navigateTo({
      url: "/pages/myPet/myPet"
    })
  },

  toUserCenter() {
    wx.navigateTo({
      url: "/pages/user/userCenter/userCenter"
    })
  },

  getUserInfo() {
    getUserInfo({ id: this.data.userinfo.id }).then(res => {
      this.setData({
        userInfo: res
      })
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.setData({
      userinfo: wx.getStorageSync('userinfo')
    })
    // 获取宠物信息
    const userInfo = wx.getStorageSync('userinfo')
    if (userInfo) {
      getPet({
        userId: userInfo.id
      }).then(res => {
        if (res) {
          this.setData({
            petInfo: res
          })
        }
      })
    }
    this.getUserInfo()  
  },



})