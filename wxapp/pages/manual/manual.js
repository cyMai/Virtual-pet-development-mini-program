// pages/manual/manual.js
import { getManualPages, addManualPage } from "../../api/apis"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    manualPages: [],
    currentPage: 0,
    showModal: false,
    tempImage: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getPages()
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

  getPages() {
    getManualPages().then(res => {
      if(res) {
        this.setData({
          manualPages: res
        })
      }
    })
  },

  onSwiperChange(e) {
    this.setData({
      currentPage: e.detail.current
    })
  },

  showAddModal() {
    this.setData({
      showModal: true,
      tempImage: ''
    })
  },

  hideModal() {
    this.setData({
      showModal: false
    })
  },

  chooseImage() {
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
                tempImage: data.url
              })
            } else {
              wx.showToast({
                title: '上传失败',
                icon: 'error'
              })
            }
          }
        })
      }
    })
  },

  submitImage() {
    if(!this.data.tempImage) {
      wx.showToast({
        title: '请选择图片',
        icon: 'none'
      })
      return
    }

    addManualPage({
      img: this.data.tempImage
    }).then(res => {
      if(res) {
        wx.showToast({
          title: '添加成功',
          icon: 'success'
        })
        this.hideModal()
        this.getPages()
      }
    })
  }
})