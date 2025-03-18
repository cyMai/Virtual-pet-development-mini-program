<template>
  <div>
    <!-- 判断是否在空白页打开 -->
    <template v-if="!isOneself">
      <div class="app-wrapper">
        <!-- 系统标题 -->
        <div class="system-title">
          <div class="title">宠物后台管理系统</div>
        </div>
        <!-- 左侧菜单 -->
        <div class="sidebar-container">
          <ElMenu />
        </div>
        <!-- 右侧展示内容 -->
        <div class="main-container">
          <HeaderNav class="header-main" />
          <AppContent class="app-main" />
        </div>
      </div>
    </template>
    <!-- 如果在空白页打开则不显示框架 -->
    <template v-else>
      <AppContent />
    </template>
  </div>
</template>

<script>
import ElMenu from './components/ElMenu/index.vue'
import HeaderNav from './components/HeaderNav.vue'
import AppContent from './components/AppContent.vue'
export default {
  data() {
    return {
      // 默认页面在框架内显示
      isOneself: false,
      // 系统标题
      systemTitle: '',
    }
  },
  components: {
    ElMenu,
    HeaderNav,
    AppContent,
  },
  mounted() {
    // 初始化加载一次判断是否在空白页打开
    this.isOneself = this.$route.meta.oneself

  },
  methods: {


  },
  watch: {
    // 监听route变化
    $route: function (newVal) {
      // 判断页面是否在空白页打开
      this.isOneself = newVal.meta.oneself
    },
  },
}
</script>

<style lang="less" scoped>
.app-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
  // 系统标题
  .system-title {
    display: flex;
    position: fixed;
    justify-content: space-around;
    align-items: center;
    color: white;
    width: 200px;
    height: 50px;
    top: 0;
    left: 0;
    background-color: #999;
    padding: 0px 10px;
    box-sizing: border-box;
    .image {
      width: 40px;
      height: 40px;
      border-radius: 20px;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .title {
      font-weight: 700;
    }
  }
  // 左侧菜单
  .sidebar-container {
    background-color: #fff;
    -webkit-transition: width 0.28s;
    transition: width 0.28s;
    width: 200px !important;
    height: 100%;
    position: fixed;
    font-size: 0px;
    top: 50px;
    bottom: 0;
    left: 0;
    z-index: 1001;
    overflow: hidden;
    //-webkit-box-shadow: 2px 0 6px rgb(0 21 41 / 35%);
    //box-shadow: 2px 0 6px rgb(0 21 41 / 35%);
    // border-right: 1px solid rgba(0, 0, 0, 0.2);
    & > div {
      width: 201px !important;
    }
  }
  // 右侧主题内容
  .main-container {
    -webkit-transition: margin-left 0.28s;
    transition: margin-left 0.28s;
    position: fixed;
    width: calc(100vw - 200px);
    top: 50px;
    right: 0;
    bottom: 0;
    left: 200px;
    // 头部导航
    .header-main {
      position: fixed;
      height: 50px;
      width: 100%;
      left: 200px;
      right: 0;
      top: 0;
      display: flex;
      align-items: center;
      padding-left: 15px;
      box-sizing: border-box;
      background-color: #fff;
      // border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    }
    // 内容展示区
    .app-main {
      position: relative;
      height: 95vh;
      width: 100%;
      overflow: auto;
      background-color: #f0f0f0;
    }
  }
}
</style>
