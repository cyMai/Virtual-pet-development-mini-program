// pages/guess/guess.js
import { getPet, updateUserInfo, getUserInfo, merge2048 } from "../../api/apis"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    petInfo: null,
    idioms: [
      {emojis: ['🍃', '🚌', '👌🏼', '🐉'], answer: '叶公好龙'},
      {emojis: ['🍬', '💪', '🚧', '🚗'], answer: '螳臂当车'},
      {emojis: ['🌂', '🦴', '🐱', '🦌'], answer: '三顾茅庐'},
      {emojis: ['🎈', '👄', '🎺', '🐍'], answer: '七嘴八舌'},
      {emojis: ['🏆', '🍉', '🍌', '➕'], answer: '悲喜交加'},
      {emojis: ['⛄', '☔', '⭐', '💨'], answer: '血雨腥风'},
      {emojis: ['👋🏻', '🐷', '🎗', '🐰'], answer: '守株待兔'},
      {emojis: ['❤️', '❤️', '🐘', '🎵'], answer: '心心相印'},
      {emojis: ['🥣', '🦁', '🐛', '🧥'], answer: '万事如意'},
      {emojis: ['㊗️', '⭐️', '🍰', '💡'], answer: '福星高照'},
      {emojis: ['🧚🏻‍♀️', '🥬', '🧥', '🧥'], answer: '神采奕奕'},
      {emojis: ['🦶🏻', '🦶🏻', '🍰', '🥜'], answer: '步步高升'},
      {emojis: ['❤️', '🐘', '💩', '🍊'], answer: '心想事成'},
      {emojis: ['🧥', '⛵️', '💨', '👦🏻'], answer: '一帆风顺'},
      {emojis: ['🥜', '👀', '🌸', '💰'], answer: '升官发财'},
      {emojis: ['💢', '🍊', '🥣', '🍐'], answer: '鹏程万里'},
      {emojis: ['🍉', '⬆️', '♣️', '🥄'], answer: '喜上眉梢'},
      {emojis: ['🐲', '🐎', '🧚🏻‍♀️', '🈸'], answer: '龙马精神'},
      {emojis: ['🈚️', '🌾', '💨', '🏮'], answer: '五谷丰登'},
      {emojis: ['⭐️', '🥁', '♟', '🙅🏻'], answer: '星罗棋布'},
      {emojis: ['🍉', '🎈', '🐏', '🐏'], answer: '喜气洋洋'},
      {emojis: ['🐔', '💩', '🐛', '🧥'], answer: '吉祥如意'},
      {emojis: ['⛵️', '🍐', '🍊', '✋🏻'], answer: '顺理成章'},
      {emojis: ['👋🏻', '💰', '🪞', '🍑'], answer: '招财进宝'},
      {emojis: ['🐔', '⭐️', '🍰', '💡'], answer: '吉星高照'},
      {emojis: ['🐙', '💡', '🪢', '🌈'], answer: '张灯结彩'},
      {emojis: ['🆒', '🪵', '🪡', '👄'], answer: '枯木逢春'},
      {emojis: ['🧥', '🦌', '⛵️', '💨'], answer: '一路顺风'},
      {emojis: ['🤙🏻', '🐖', '⭐️', '🐶'], answer: '六畜兴旺'},
      {emojis: ['🌞', '❤️', '🈷️', '🧥'], answer: '日新月异'},
      {emojis: ['💰', '➕', '🥣', '🐯'], answer: '千家万户'},
      {emojis: ['💰', '🍊', '④', '🕳'], answer: '前程似锦'},
      {emojis: ['⬆️', '❤️', '🌜', '👀'], answer: '赏心悦目'},
      {emojis: ['🪞', '🌸', '💦', '🌜'], answer: '镜花水月'},
      {emojis: ['🪨', '💦', '🪨', '🌹'], answer: '十全十美'},
      {emojis: ['👍🏻', '🐔', '👍🏻', '🍐'], answer: '大吉大利'},
      {emojis: ['🦡', '🍊', '🧥', '🍭'], answer: '欢聚一堂'},
      {emojis: ['🕑', '✋', '⭕', '⭕'], answer: '两手空空'},
      {emojis: ['💉', '👂', '🐠', '🙉'], answer: '震耳欲聋'},
      {emojis: ['⚽', '👦', '🉐', '👦'], answer: '求仁得仁'},
      {emojis: ['🐤', '☔', '🌸', '📦'], answer: '鸟语花香'},
      {emojis: ['🚶', '🐴', '⬆', '👦'], answer: '走马上任'},
      {emojis: ['👀', '2⃣', '🈚', '✉'], answer: '言而无信'},
      {emojis: ['🍃', '🐋', '🐟', '🎹'], answer: '业精于勤'},
      {emojis: ['👕', '👀', '🐒', '😄'], answer: '以观后效'},
      {emojis: ['💢', '🔥', '🀄', '🔥'], answer: '怒火中烧'},
      {emojis: ['🍜', '🈚', '🙎', '😍'], answer: '面无人色'},
      {emojis: ['🐠', '🎼', '➰', '🍚'], answer: '余音绕梁'},
      {emojis: ['☔', '🀄', '❤', '🎤'], answer: '语重心长'},
      {emojis: ['💼', '🐳', '💩', '💀'], answer: '饱经世故'},
      {emojis: ['🎏', '👴', '🍹', '💪'], answer: '渔翁之利'},
      {emojis: ['💺', '🍚', '🗻', '⚪'], answer: '坐吃山空'},
      {emojis: ['9⃣', '🕕', '3⃣', '👣'], answer: '九流三教'},
      {emojis: ['👄', '👄', '🐘', '⛵'], answer: '口口相传'},
      {emojis: ['💨', '☔', '🕖', '🕖'], answer: '风雨凄凄'},
      {emojis: ['👆', '🎂', '🎈', '🐑'], answer: '趾高气扬'},
      {emojis: ['🔮', '💥', '💎', '🎈'], answer: '珠光宝气'},
      {emojis: ['🈹', '🍺', '🈹', '📞'], answer: '各就各位'},
      {emojis: ['🏠', '🍹', '👨', '🍊'], answer: '价值连城'}
    ],
    currentIndex: 0,
    currentEmojis: [],
    userGuess: '',
    showSuccessModal: false,
    showHintModal: false,
    showGiveUpModal: false,
    currentAnswer: '',
    currentHint: '',
    hintCount: 0,
    score: 0,
    solvedIdioms: [],
    bestScore: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const solvedIdioms = wx.getStorageSync('solvedIdioms') || [];
    
    // 获取用户最高分
    const userInfo = wx.getStorageSync('userinfo');
    if(userInfo) {
      getUserInfo({
        id: userInfo.id
      }).then(res => {
        if(res && res.maxScore) {
          this.setData({ 
            bestScore: res.maxScore
          });
        }
      });
    }

    this.setData({
      solvedIdioms: solvedIdioms
    }, () => {
      this.setNextUnsolved();
    });
    this.getPetInfo();
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

  setCurrentIdiom() {
    const currentIdiom = this.data.idioms[this.data.currentIndex];
    this.setData({
      currentEmojis: currentIdiom.emojis,
      userGuess: ''
    });
  },

  onInput(e) {
    this.setData({
      userGuess: e.detail.value
    });
  },

  showHint() {
    const currentIdiom = this.data.idioms[this.data.currentIndex];
    const answer = currentIdiom.answer;
    const hintCount = this.data.hintCount;
    
    if (hintCount >= answer.length) {
      wx.showToast({
        title: '没有更多提示了',
        icon: 'none'
      });
      return;
    }
    
    let hint = '';
    for (let i = 0; i < answer.length; i++) {
      if (i <= hintCount) {
        hint += answer[i];
      } else {
        hint += '?';
      }
    }
    
    this.setData({
      showHintModal: true,
      currentHint: hint,
      hintCount: hintCount + 1
    });
  },

  closeHint() {
    this.setData({
      showHintModal: false
    });
  },

  giveUp() {
    const currentIdiom = this.data.idioms[this.data.currentIndex];
    const newSolvedIdioms = [...this.data.solvedIdioms, this.data.currentIndex];
    
    this.setData({
      solvedIdioms: newSolvedIdioms,
      userGuess: '',
      showGiveUpModal: true,
      currentAnswer: currentIdiom.answer
    });
    
    wx.setStorageSync('solvedIdioms', newSolvedIdioms);
  },

  closeGiveUp() {
    this.setData({
      showGiveUpModal: false
    }, () => {
      this.setNextUnsolved();
    });
  },

  checkAnswer() {
    const currentIdiom = this.data.idioms[this.data.currentIndex];
    if (this.data.userGuess === currentIdiom.answer) {
      const newSolvedIdioms = [...this.data.solvedIdioms, this.data.currentIndex];
      const newScore = this.data.score + 1;
      
      this.setData({
        showSuccessModal: true,
        score: newScore,
        solvedIdioms: newSolvedIdioms
      });
      
      wx.setStorageSync('solvedIdioms', newSolvedIdioms);

      // 猜对成语时增加心情值
      if(this.data.petInfo) {
        merge2048({
          userId: wx.getStorageSync('userinfo').id,
          petId: this.data.petInfo.id,
          type: '猜成语'
        }).then(res => {
          if(res) {
            wx.showToast({
              title: `心情值+${res.moodGained}`,
              icon: 'none'
            })
          }
        })
      }

      // 更新最高分
      if (newScore > this.data.bestScore) {
        const userInfo = wx.getStorageSync('userinfo');
        updateUserInfo({
          id: userInfo.id,
          maxScore: newScore,
          username: userInfo.username,
          password: userInfo.password,
          avatar: userInfo.avatar
        }).then(res => {
          if(res) {
            this.setData({ bestScore: newScore });
            // 更新本地存储的用户信息
            const localUserInfo = wx.getStorageSync('userinfo');
            localUserInfo.maxScore = newScore;
            wx.setStorageSync('userinfo', localUserInfo);
          }
        });
      }
    } else {
      wx.showToast({
        title: '再想想看~',
        icon: 'none'
      });
    }
  },

  setNextUnsolved() {
    const { idioms, solvedIdioms } = this.data;
    
    if (solvedIdioms.length === idioms.length) {
      this.setData({
        solvedIdioms: [],
        currentIndex: 0
      }, () => {
        wx.setStorageSync('solvedIdioms', []);
        this.setCurrentIdiom();
      });
      return;
    }
    
    let nextIndex = this.data.currentIndex;
    while (solvedIdioms.includes(nextIndex)) {
      nextIndex = (nextIndex + 1) % idioms.length;
    }
    
    this.setData({
      currentIndex: nextIndex
    }, () => {
      this.setCurrentIdiom();
    });
  },

  nextIdiom() {
    this.setData({
      showSuccessModal: false,
      hintCount: 0,
      userGuess: ''
    }, () => {
      this.setNextUnsolved();
    });
  },

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
        }
      })
    }
  }
})