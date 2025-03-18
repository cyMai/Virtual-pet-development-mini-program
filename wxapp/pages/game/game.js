// pages/game/game.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  onShow() {

  },
  goTo2048(){
    wx.navigateTo({
      url: '/pages/2048/2048'
    })
  },
  goToGuess(){
    wx.navigateTo({
      url: '/pages/guess/guess'
    })
  }
})