// pages/user/userCenter/userCenter.js
import { getUserInfo, updateUserInfo } from "../../../api/apis"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getUserInfo()
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

  getUserInfo() {
    const userInfo = wx.getStorageSync('userinfo')
    if(userInfo) {
      getUserInfo({
        id: userInfo.id
      }).then(res => {
        if(res) {
          this.setData({
            userInfo: res
          })
        }
      })
    }
  },


  onNicknameInput(e) {
    this.setData({
      'userInfo.userNickname': e.detail.value
    })
  },



  changeAvatar() {
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        const tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: 'http://localhost:9999/common/upload',
          filePath: tempFilePaths[0],
          name: 'file',
          success: (res) => {
            const data = JSON.parse(res.data)
            if(data.code === 200) {
              this.setData({
                'userInfo.userPic': data.url
              })
              wx.showToast({
                title: '头像更新成功',
                icon: 'success'
              })
            } else {
              wx.showToast({
                title: '上传失败',
                icon: 'error'
              })
            }
          },
          fail: () => {
            wx.showToast({
              title: '上传失败',
              icon: 'error'
            })
          }
        })
      }
    })
  },

  saveChanges() {
    const { userInfo } = this.data
    updateUserInfo(userInfo).then(res => {
      if(res) {
        wx.showToast({
          title: '保存成功',
          icon: 'success'
        })
        // 更新本地存储的用户信息
        wx.setStorageSync('userinfo', userInfo)
        
        setTimeout(() => {
          wx.navigateBack()
        }, 1500)
      }
    })
  }
})