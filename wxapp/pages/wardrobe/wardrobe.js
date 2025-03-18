// pages/wardrobe/wardrobe.js
import { getClothes, getUserInfo, updateClothes, updateUserInfo } from "../../api/apis"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    clothes: [],
    showSuccessModal: false,
    showFailModal: false
  },
  checkOwnership(userIds, userId) {
    if (!userIds) return false;
    return userIds.split(',').includes(userId.toString());
  },
  onShow() {
    this.getUserInfo()
    this.getClothes()
  },

  // 获取用户信息
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

  // 获取服装列表
  getClothes() {
    getClothes().then(res => {
      if(res) {
        // 为每个物品添加isOwned属性
        const processedClothes = res.map(item => ({
          ...item,
          isOwned: this.checkOwnership(item.userIds, this.data.userInfo.id)
        }));
        this.setData({
          clothes: processedClothes
        })
      }
    })
  },

  // 购买服装
  buyClothes(e) {
    const { id, price } = e.currentTarget.dataset
    const userCoins = this.data.userInfo.coins || 0

    // 检查是否已拥有
    const currentClothes = this.data.clothes.find(item => item.id === id)
    if(currentClothes.isOwned) {
      wx.showToast({
        title: '已拥有该物品',
        icon: 'none'
      })
      return
    }
    
    if(userCoins >= price) {
      // 计算剩余金币
      const remainingCoins = userCoins - price;
      
      // 更新服装状态
      updateClothes({
        id: id,
        userId: this.data.userInfo.id
      }).then(res => {
        if(res) {
          // 更新用户金币
          updateUserInfo({
            id: this.data.userInfo.id,
            coins: remainingCoins
          }).then(() => {
            this.setData({
              showSuccessModal: true
            })
            // 刷新数据
            this.getUserInfo()
            this.getClothes()
          })
        }
      })
    } else {
      this.setData({
        showFailModal: true
      })
    }
  },

  // 关闭弹窗
  closeModal() {
    this.setData({
      showSuccessModal: false,
      showFailModal: false
    })
  }
})