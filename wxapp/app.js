// app.js
App({
  onLaunch() {
    if(wx.getStorageSync('userinfo')){
    
    }else{

      wx.navigateTo({
        url: '/pages/login/login',
      })
    }
  },
  globalData: {
    userInfo: null
  }
})
