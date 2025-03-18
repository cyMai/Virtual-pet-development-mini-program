// pages/index/index.js
import { getPet, getUserInfo } from "../../api/apis"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    banner:[
      {bannerPic:"/images/carousel/1.jpg"},
      {bannerPic:"/images/carousel/2.jpg"},
      {bannerPic:"/images/carousel/3.jpg"},
    ],
    greeting: '',
    currentDate: '',
    petInfo: null,
    userInfo: null,
    petImage: '/images/com/delivery.jpg'  // 默认图片
  },

  onLoad(options) {
    this.updateDateTime();
    // 检查是否有宠物
    const userInfo = wx.getStorageSync('userinfo')
    if(userInfo) {
      getPet({
        userId: userInfo.id
      }).then(res => {
        if(!res) {
          // 没有宠物，跳转到领养页面
          wx.navigateTo({
            url: '/pages/myPet/myPet'
          })
          return
        }
        // 有宠物，正常加载页面
        this.setData({
          petInfo: res
        })
        this.updatePetImage(res)
      })
    }
  },

  onShow() {
    // 每次显示页面时重新获取宠物信息
    this.getUserInfo();
    this.getPetInfo();
  },


  updateDateTime() {
    const now = new Date();
    const hours = now.getHours();
    let greeting = '';
    
    if(hours < 6) {
      greeting = '凌晨好';
    } else if(hours < 12) {
      greeting = '上午好';
    } else if(hours < 14) {
      greeting = '中午好';
    } else if(hours < 18) {
      greeting = '下午好';
    } else {
      greeting = '晚上好';
    }

    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();

    this.setData({
      greeting: greeting,
      currentDate: `今天是${year}年${month}月${day}日`
    });
  },

  // 获取宠物信息
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
          // 更新宠物图片
          this.updatePetImage(res)
        }
      })
    }
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

  // 页面跳转方法
  goToTimer() {
    console.log("触发")
    wx.switchTab({
      url: '/pages/time/time'
    })
  },

  goToGame() {
    wx.navigateTo({
      url: '/pages/game/game'
    })
  },

  goToWardrobe() {
    wx.navigateTo({
      url: '/pages/wardrobe/wardrobe'
    })
  },

  navigateToRecord() {
    wx.navigateTo({
      url: '/pages/record/record'
    })
  },
  goToActivity(){
    wx.navigateTo({
      url: '/pages/activity/activity'
    })
  },
  toManual() {
    wx.navigateTo({
      url: '/pages/manual/manual'
    })
  },

  // 根据宠物类型和等级更新图片
  updatePetImage(pet) {
    let imagePath = '/images/com/delivery.jpg'
    
    if(pet.level > 0) {
      if(pet.level <= 2) {
        imagePath = '/images/com/delivery.jpg'
      } else if(pet.level <= 5) {
        imagePath = pet.type === 'dog' ? '/images/dog/dog3.jpg' : '/images/dog/dog2.jpg'
      } else {
        imagePath = '/images/dog/dog1.jpg'
      }
    }
    
    this.setData({
      petImage: imagePath
    })
  },

})