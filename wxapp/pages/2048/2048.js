import { getPet, updateUserInfo, getUserInfo, merge2048 } from "../../api/apis"

Page({
  data: {
    board: [],
    score: 0,
    bestScore: 0,
    undoCount: 3,
    hintCount: 3,
    startX: 0,
    startY: 0,
    history: [],
    petInfo: null
  },

  onLoad(options) {
    this.newGame();
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
    this.getPetInfo();
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
  },

  newGame() {
    // 初始化4x4的游戏板
    const board = Array(4).fill(0).map(() => Array(4).fill(0));
    // 添加两个初始数字
    this.addNumber(board);
    this.addNumber(board);
    
    this.setData({ 
      board, 
      score: 0,
      history: [] // 清空历史记录
    });
  },

  addNumber(board) {
    // 找到所有空位置
    const empty = [];
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (board[i][j] === 0) {
          empty.push({i, j});
        }
      }
    }
    if (empty.length) {
      // 随机选择一个空位置
      const pos = empty[Math.floor(Math.random() * empty.length)];
      // 90%概率放2，10%概率放4
      board[pos.i][pos.j] = Math.random() < 0.9 ? 2 : 4;
    }
  },

  getCellClass(value) {
    return value ? 'cell-' + value : '';
  },

  // 保存当前状态到历史记录
  saveToHistory() {
    const { board, score } = this.data;
    const history = this.data.history;
    history.push({
      board: JSON.parse(JSON.stringify(board)),
      score: score
    });
    this.setData({ history });
  },

  // 实现撤回功能
  undoMove() {
    const history = this.data.history;
    if (history.length > 0) {
      const lastState = history.pop();
      this.setData({
        board: lastState.board,
        score: lastState.score,
        history
      });
    }
  },

  showHint() {
    if (this.data.hintCount > 0) {
      this.setData({
        hintCount: this.data.hintCount - 1
      });
      // 实现提示逻辑
    }
  },

  // 触摸开始事件
  touchStart(e) {
    this.setData({
      startX: e.touches[0].pageX,
      startY: e.touches[0].pageY
    });
  },

  // 触摸结束事件
  touchEnd(e) {
    const endX = e.changedTouches[0].pageX;
    const endY = e.changedTouches[0].pageY;
    const deltaX = endX - this.data.startX;
    const deltaY = endY - this.data.startY;

    // 判断滑动方向
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      if (Math.abs(deltaX) > 30) { // 设置最小滑动距离
        if (deltaX > 0) {
          this.moveRight();
        } else {
          this.moveLeft();
        }
      }
    } else {
      if (Math.abs(deltaY) > 30) {
        if (deltaY > 0) {
          this.moveDown();
        } else {
          this.moveUp();
        }
      }
    }
  },

  // 向左移动
  moveLeft() {
    const board = JSON.parse(JSON.stringify(this.data.board));
    let moved = false;
    let merged = false;
    let score = this.data.score;

    // 在移动前保存状态
    this.saveToHistory();

    for (let i = 0; i < 4; i++) {
      let row = board[i].filter(x => x !== 0);
      for (let j = 0; j < row.length - 1; j++) {
        if (row[j] === row[j + 1]) {
          row[j] *= 2;
          row[j + 1] = 0;
          score += row[j];
          merged = true;  // 只要有合并就标记
        }
      }
      row = row.filter(x => x !== 0);
      while (row.length < 4) {
        row.push(0);
      }
      if (JSON.stringify(board[i]) !== JSON.stringify(row)) {
        moved = true;
      }
      board[i] = row;
    }

    if (moved || merged) {
      this.addNumber(board);
      this.setData({ board, score });
      
      if (merged) {
        if(this.data.petInfo) {
          merge2048({
            userId: wx.getStorageSync('userinfo').id,
            petId: this.data.petInfo.id,
            type: '2048合成'
          }).then(res => {
            if(res) {
              wx.showToast({
                title: `心情值+${res.moodGained}`,
                icon: 'none'
              })
            }
          })
        }
      }

      this.updateBestScore(score);
    }
  },

  // 向右移动
  moveRight() {
    const board = JSON.parse(JSON.stringify(this.data.board));
    let moved = false;
    let merged = false;
    let score = this.data.score;

    // 在移动前保存状态
    this.saveToHistory();

    for (let i = 0; i < 4; i++) {
      let row = board[i].filter(x => x !== 0);
      for (let j = row.length - 1; j > 0; j--) {
        if (row[j] === row[j - 1]) {
          row[j] *= 2;
          row[j - 1] = 0;
          score += row[j];
          merged = true;  // 只要有合并就标记
        }
      }
      row = row.filter(x => x !== 0);
      while (row.length < 4) {
        row.unshift(0);
      }
      if (JSON.stringify(board[i]) !== JSON.stringify(row)) {
        moved = true;
      }
      board[i] = row;
    }

    if (moved || merged) {
      this.addNumber(board);
      this.setData({ board, score });
      
      if (merged) {
        if(this.data.petInfo) {
          merge2048({
            userId: wx.getStorageSync('userinfo').id,
            petId: this.data.petInfo.id,
            type: '2048合成'
          }).then(res => {
            if(res) {
              wx.showToast({
                title: `心情值+${res.moodGained}`,
                icon: 'none'
              })
            }
          })
        }
      }

      this.updateBestScore(score);
    }
  },

  // 向上移动
  moveUp() {
    const board = this.rotateBoard(this.data.board);
    let moved = false;
    let merged = false;
    let score = this.data.score;

    // 在移动前保存状态
    this.saveToHistory();

    for (let i = 0; i < 4; i++) {
      let row = board[i].filter(x => x !== 0);
      for (let j = 0; j < row.length - 1; j++) {
        if (row[j] === row[j + 1]) {
          row[j] *= 2;
          row[j + 1] = 0;
          score += row[j];
          merged = true;  // 只要有合并就标记
        }
      }
      row = row.filter(x => x !== 0);
      while (row.length < 4) {
        row.push(0);
      }
      if (JSON.stringify(board[i]) !== JSON.stringify(row)) {
        moved = true;
      }
      board[i] = row;
    }

    if (moved || merged) {
      this.addNumber(this.rotateBoard(board));
      this.setData({ 
        board: this.rotateBoard(board), 
        score 
      });
      
      if (merged) {
        if(this.data.petInfo) {
          merge2048({
            userId: wx.getStorageSync('userinfo').id,
            petId: this.data.petInfo.id,
            type: '2048合成'
          }).then(res => {
            if(res) {
              wx.showToast({
                title: `心情值+${res.moodGained}`,
                icon: 'none'
              })
            }
          })
        }
      }

      this.updateBestScore(score);
    }
  },

  // 向下移动
  moveDown() {
    const board = this.rotateBoard(this.data.board);
    let moved = false;
    let merged = false;
    let score = this.data.score;

    // 在移动前保存状态
    this.saveToHistory();

    for (let i = 0; i < 4; i++) {
      let row = board[i].filter(x => x !== 0);
      for (let j = row.length - 1; j > 0; j--) {
        if (row[j] === row[j - 1]) {
          row[j] *= 2;
          row[j - 1] = 0;
          score += row[j];
          merged = true;  // 只要有合并就标记
        }
      }
      row = row.filter(x => x !== 0);
      while (row.length < 4) {
        row.unshift(0);
      }
      if (JSON.stringify(board[i]) !== JSON.stringify(row)) {
        moved = true;
      }
      board[i] = row;
    }

    if (moved || merged) {
      this.addNumber(this.rotateBoard(board));
      this.setData({ 
        board: this.rotateBoard(board), 
        score 
      });
      
      if (merged) {
        if(this.data.petInfo) {
          merge2048({
            userId: wx.getStorageSync('userinfo').id,
            petId: this.data.petInfo.id,
            type: '2048合成'
          }).then(res => {
            if(res) {
              wx.showToast({
                title: `心情值+${res.moodGained}`,
                icon: 'none'
              })
            }
          })
        }
      }

      this.updateBestScore(score);
    }
  },

  // 旋转棋盘（用于上下移动）
  rotateBoard(board) {
    const rotated = Array(4).fill(0).map(() => Array(4).fill(0));
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        rotated[i][j] = board[j][i];
      }
    }
    return rotated;
  },

  // 更新最高分的逻辑
  updateBestScore(score) {
    if (score > this.data.bestScore) {
      const userInfo = wx.getStorageSync('userinfo');
      updateUserInfo({
        id: userInfo.id,
        maxScore: score,
        username: userInfo.username,
        password: userInfo.password,
        avatar: userInfo.avatar
      }).then(res => {
        if(res) {
          this.setData({ bestScore: score });
          const localUserInfo = wx.getStorageSync('userinfo');
          localUserInfo.maxScore = score;
          wx.setStorageSync('userinfo', localUserInfo);
        }
      });
    }
  }
}) 