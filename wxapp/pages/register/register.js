// pages/login/login.js

import{userregister }from "../../api/apis"
Page({

  /**
   * 页面的初始数据
   */
 /**
     * 页面的初始数据
     */
    data: {
      keyword:"账号",
      account:'',
      password:'',
      password2:"",
  },
  email(){
this.setData({
  keyword:"邮箱",
})
  },
  phone(){
    this.setData({
      keyword:"手机号",
    })
  },
  zhuce(){
    userregister({
      userAccount:this.data.account,
      userPassword:this.data.password,
      userPermissions:"普通用户"
    }).then(res=>{
      console.log("resres",res)
      if(res){
        wx.showModal({
          title:"提示",
          content:this.data.keyword+"注册成功！即将跳转登陆页面",
          showCancel:false,
          success(res){
            wx.navigateTo({
              url: '/pages/login/login',
            })
          }
          })
      }else{
        wx.showModal({
          title:"提示",
          content:'该账号已经注册过',
          showCancel:false,
          success(res){
        
          }
          })
      }
    
    })
  },

  accountInput:function (e) {
      this.data.account = e.detail.value
  },


  passwordInput:function (e) {
      this.data.password = e.detail.value
  },
  passwordInput2:function (e) {
    this.data.password2 = e.detail.value
},


  regist:function (e) {
      wx.navigateTo({
        url: '/pages/login/login',
      })
  },


  signin:function (e) {
     
      if(this.data.account==''){
          wx.showModal({
            title:"提示",
            content:"请输入"+this.data.keyword,
            showCancel:false,
            success(res){}
            })
            return
      }
       if(this.data.password==''){
          wx.showModal({
              title:"提示",
              content:"请输入密码",
              showCancel:false,
              success(res){}
              })
              return
      }
      if(this.data.password2==''){
        wx.showModal({
            title:"提示",
            content:"请再次输入密码",
            showCancel:false,
            success(res){}
            })
            return
    }
    if(this.data.keyword=="账号"){
      if(this.data.account.length<=2 || this.data.account.length>=20){
        wx.showModal({
          title:"提示",
          content:"账号长度应在2-20之间",
          showCancel:false,
          success(res){}
          })
          return
      }
    }else if(this.data.keyword=="邮箱"){
      
var ePattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      if(!ePattern.test(this.data.account)){
        wx.showModal({
          title:"提示",
          content:"请输入正确的邮箱号",
          showCancel:false,
          success(res){}
          })
          return
      }
    }else if(this.data.keyword=="手机号"){
      var ePattern = /^1[34578]\d{9}$/; 
      if(!ePattern.test(this.data.account)){
        wx.showModal({
          title:"提示",
          content:"请输入正确的手机号",
          showCancel:false,
          success(res){}
          })
          return
      }
    }

    if(this.data.password.length<=5 && this.data.password.length>=20){
      wx.showModal({
        title:"提示",
        content:"密码长度应在5-20之间",
        showCancel:false,
        success(res){}
        })
        return
    }
    if(this.data.password2!==this.data.password){
      wx.showModal({
        title:"提示",
        content:"两次输入密码不相同",
        showCancel:false,
        success(res){}
        })
        return
    }
    this.zhuce()

     

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

  }
})