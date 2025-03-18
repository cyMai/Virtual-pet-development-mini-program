// pages/myPet/myPet.js

import { addPet, getPet } from "../../api/apis"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectedType: '',
    petName: '',
    userId: '',
    hasPet: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 获取用户ID
    const userInfo = wx.getStorageSync('userinfo')
    if(userInfo) {
      this.setData({
        userId: userInfo.id
      })
      // 检查是否已有宠物
      this.checkExistingPet(userInfo.id)
    }
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

  // 选择宠物类型
  selectType(e) {
    const type = e.currentTarget.dataset.type
    this.setData({
      selectedType: type
    })
  },

  // 输入宠物名称
  onNameInput(e) {
    this.setData({
      petName: e.detail.value
    })
  },

  checkExistingPet(userId) {
    getPet({
      userId: userId
    }).then(res => {
      if(res) {
        this.setData({
          hasPet: true
        })
        wx.showModal({
          title: '提示',
          content: '您已经有一个宠物了哦',
          showCancel: false,
          success: () => {
            wx.navigateBack()
          }
        })
      }
    })
  },

  // 创建宠物
  createPet() {
    if(this.data.hasPet) {
      wx.showToast({
        title: '您已经有宠物了',
        icon: 'none'
      })
      return
    }

    if(!this.data.selectedType || !this.data.petName) {
      wx.showToast({
        title: '请填写完整信息',
        icon: 'none'
      })
      return
    }

    const petData = {
      userId: this.data.userId,
      name: this.data.petName,
      type: this.data.selectedType
    }

    addPet(petData).then(res => {
      if(res) {
        wx.showToast({
          title: '创建成功',
          icon: 'success'
        })
        // 创建成功后返回上一页
        setTimeout(() => {
          wx.navigateBack()
        }, 1500)
      } else {
        wx.showToast({
          title: res.msg || '创建失败',
          icon: 'none'
        })
      }
    }).catch(err => {
      wx.showToast({
        title: '创建失败',
        icon: 'none'
      })
    })
  }
})