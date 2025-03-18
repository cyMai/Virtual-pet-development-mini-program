// pages/time/time.js
import { addFocusRecord, getPet } from "../../api/apis"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    taskName: '',  // 专注任务名称
    timeArray: Array.from({length: 25}, (_, i) => (i + 1) * 5),
    pickerValue: [4], // 默认25分钟(索引4对应25分钟)
    selectedTime: 25,  // 选中的时间
    showModal: false,  // 是否显示弹窗
    currentTime: '',   // 当前时间显示
    petInfo: null,     // 宠物信息
    userInfo: null     // 用户信息
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 获取用户信息和宠物信息
    const userInfo = wx.getStorageSync('userinfo')
    this.setData({ userInfo })
    
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

  onShow() {

  },
  // 任务输入
  onTaskInput(e) {
    this.setData({
      taskName: e.detail.value
    })
  },

  // 时间选择
  onTimeChange(e) {
    const val = e.detail.value
    this.setData({
      selectedTime: this.data.timeArray[val[0]]  // 直接使用timeArray中的值
    })
  },

  // 开始专注
  startFocus() {
    if(!this.data.taskName) {
      wx.showToast({
        title: '请输入专注任务',
        icon: 'none'
      })
      return
    }

    // 显示确认弹窗
    const now = new Date()
    const hours = now.getHours().toString().padStart(2, '0')
    const minutes = now.getMinutes().toString().padStart(2, '0')
    
    this.setData({
      showModal: true,
      currentTime: `${hours}:${minutes}`
    })
  },

  // 关闭弹窗
  closeModal() {
    this.setData({
      showModal: false
    })
  },

  // 确认专注类型并开始
  confirmFocus(e) {
    const type = e.currentTarget.dataset.type
    
    // 保存专注开始时间和宠物信息
    wx.setStorageSync('focus_start', new Date().getTime())
    wx.setStorageSync('petInfo', this.data.petInfo)
    wx.setStorageSync('petName', this.data.petInfo.name)
    
    // 跳转到专注页面
    wx.navigateTo({
      url: `/pages/focus/focus?type=${type}&time=${this.data.selectedTime}:00&taskName=${encodeURIComponent(this.data.taskName)}`
    })

    this.setData({
      showModal: false
    })
  }
})