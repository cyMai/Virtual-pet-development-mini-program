<template>
  <div>
    <!-- 左侧返回和首页 -->
    <div class="left-caozuoicon">

      <div class="pgeas-tab">
          <i :class="nowRouteIcon"></i>
          <span style="margin-left: 5px">{{ nowRouteName }}</span>
      </div>
    </div>
    <!-- 右侧用户登录图标 -->
    <div class="user-logininfo">
      <!-- 顶部搜索框 -->

      <el-dropdown @command="clickmenu">
        <span class="el-dropdown-link right-userName">
          <div>{{ userInfo.userNickname }}</div>
          <div class="image">
            <img src="../../assets/logo/userimg.png" alt="" srcset="" />
          </div>

        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="outlogin">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>


export default {
  components: {

  },
  data() {
    return {
      // 获取当前页面名称
      nowRouteName: '',
      nowRouteIcon: '',
      userInfo: '',
    }
  },
  mounted() {
    // 设置标题
    this.setNowRouteName(this.$route)
    // 获取用户信息
    this.getUserInfo()
  },
  methods: {
    // 获取用户信息
    getUserInfo() {
      this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
    },
    // 获取当前页面标题
    setNowRouteName(route) {
      this.nowRouteName = route.meta.title
      this.nowRouteIcon = route.meta.icon
    },

    // 点击下拉菜单回调
    clickmenu(e) {
      if (e === 'outlogin') {
        this.outLogin()
      }
    },
    // 退出登录
    outLogin() {
      localStorage.removeItem('userInfo')
       this.$router.push('/login')
    },
  },
  watch: {
    $route: function (newRoute) {
      this.setNowRouteName(newRoute)
    },
  },
}
</script>

<style lang="less" scoped>
// 左侧操作图标
.left-caozuoicon {
  display: flex;
  align-items: center;
  gap: 30px;
  padding-left: 20px;
  box-sizing: border-box;
  .pgeas-tab {
    display: flex;
    height: 40px;
    justify-content: center;
    align-items: center;
    gap: 15px;
  }
}
// 右侧用户头像
.user-logininfo {
  display: flex;
  align-items: center;
  position: fixed;
  right: 20px;
  gap: 10px;
  cursor: pointer;
  .image {
    width: 30px;
    height: 30px;
    border-radius: 15px;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }
}

.right-userName {
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>
