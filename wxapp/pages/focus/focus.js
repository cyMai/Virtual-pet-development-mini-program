import { addFocusRecord } from "../../api/apis"

Page({
  data: {
    time: '',
    petName: '',
    type: '',
    taskName: '',
    bgImage: '',
    minutes: 0,
    seconds: 0,
    showEndModal: false,
    isSuccess: true,
    totalMinutes: 0,
    isPaused: false,
    startTime: null
  },

  onLoad(options) {
    const { type, time, taskName } = options;
    const decodedTaskName = decodeURIComponent(taskName);
    const petInfo = wx.getStorageSync('petInfo');
    const petName = petInfo ? petInfo.name : 'Momo';
    const focusStart = wx.getStorageSync('focus_start');
    const bgImage = type === 'study' 
      ? '/images/com/study3.jpg'
      : '/images/com/play2.jpg';

    // 解析时间字符串 "05:00" 格式
    const [minutes] = time.split(':');
    const totalMinutes = parseInt(minutes);
    
    this.setData({
      type,
      time,
      petName,
      bgImage,
      taskName: decodedTaskName,
      minutes: totalMinutes,
      seconds: 0,
      totalMinutes,
      startTime: focusStart
    });

    this.startCountDown();
  },

  startCountDown() {
    this.timer = setInterval(() => {
      let { minutes, seconds } = this.data;
      
      if (minutes === 0 && seconds === 0) {
        clearInterval(this.timer);
        this.showEndingModal();
        return;
      }

      if (seconds === 0) {
        minutes--;
        seconds = 59;
      } else {
        seconds--;
      }

      this.setData({
        minutes,
        seconds,
        time: `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
      });
    }, 1000);
  },

  showEndingModal() {
    const userInfo = wx.getStorageSync('userinfo')
    const petInfo = wx.getStorageSync('petInfo');
    
    // 调试信息
    console.log('用户信息:', userInfo);
    console.log('宠物信息:', petInfo);
    
    if (!petInfo) {
      console.error('获取宠物信息失败');
      wx.showToast({
        title: '获取宠物信息失败',
        icon: 'none'
      });
      return;
    }
    
    if(this.data.isSuccess) {
      // 添加专注记录
      const focusData = {
        userId: userInfo.id,
        petId: petInfo.id,
        focusName: this.data.taskName,
        focusTime: this.data.totalMinutes
      }
      
      console.log('准备提交的专注数据:', focusData);
      
      addFocusRecord(focusData).then(res => {
        console.log('专注记录响应:', res);
        if(res) {
          wx.showToast({
            title: `获得${res.data.expGained}点经验值`,
            icon: 'none',
            duration: 2000
          })
        } else {
          console.error('添加专注记录失败');
          wx.showToast({
            title: '添加记录失败',
            icon: 'error'
          });
        }
      }).catch(err => {
        console.error('添加专注记录错误:', err);
        wx.showToast({
          title: '添加记录出错',
          icon: 'error'
        });
      });
    }

    this.setData({
      showEndModal: true
    });

    // 清除专注开始记录和宠物信息
    wx.removeStorageSync('focus_start');
    wx.removeStorageSync('petInfo');
    wx.removeStorageSync('petName');
  },

  backToMain() {
    wx.switchTab({
      url: '/pages/index/index',
      fail: (err) => {
        console.error('返回首页失败：', err);
        wx.showToast({
          title: '返回失败',
          icon: 'none'
        });
      }
    });
  },

  onUnload() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  },

  pauseTimer() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
      this.setData({
        isPaused: true
      });
    } else {
      this.startCountDown();
      this.setData({
        isPaused: false
      });
    }
  },

  stopTimer() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    this.setData({
      isSuccess: false
    });
    this.showEndingModal();
  },

  // 直接完成专注
  finishNow() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    this.setData({
      minutes: 0,
      seconds: 0,
      time: '00:00',
      isSuccess: true
    });
    this.showEndingModal();
  }
}) 