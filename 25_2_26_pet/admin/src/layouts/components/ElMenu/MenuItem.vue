<template>
  <!-- 判断当前页面是否显示，如果hide为true，则不渲染该菜单 -->
  <div v-if="!item.meta.hide">
    <!-- 根菜单 -->
    <MenuLink :to="resolvePath()" v-if="!item.children">

      <el-menu-item  :index="resolvePath()">
        <i :class="item.meta.icon || ''"></i>
        <span slot="title">{{ item.meta.title }}</span>
      </el-menu-item>
    </MenuLink>

    <!-- 可展开菜单 -->
    <el-submenu :index="resolvePath()" v-else>
      <template slot="title">
        <i :class="item.meta.icon"></i>
        <span slot="title">{{ item.meta.title }}</span>
      </template>
      <!-- 这里递归去展示多级菜单 -->
      <menu-item
        v-for="(route, index) in item.children"
        :key="index"
        :item="route"
        :fatherPath="resolvePath(route.path)"
      >
      </menu-item>
    </el-submenu>
  </div>
</template>

<script>
// 引入path用来处理路径
import path from "path";
import MenuLink from "./MenuLink.vue";

export default {
  // 做组件递归时必须定义一个name。然后递归时的组件名就是这里的name值
  name: "MenuItem",
  components: {
    MenuLink,
  },
  props: {
    // 上一级的路由信息
    item: {
      type: Object,
      default: null,
    },
    // 上一级的路径
    fatherPath: {
      type: String,
      default: "",
    },
  },
  data() {
    return {};
  },
  methods: {
    // 判断路径是否是外部地址
    isExternal(path) {
      return /^(https?:|mailto:|tel:)/.test(path);
    },
    // 解析页面地址
    resolvePath(routePath = "") {
      // 判断当前页面地址是否为外部地址
      if (this.isExternal(routePath)) {
        return routePath;
      }
      // 判断从父组件传递过来的地址是否为外部地址
      if (this.isExternal(this.fatherPath)) {
        return this.fatherPath;
      }
      // 格式化页面地址
      return path.resolve(this.fatherPath, routePath);
    },
  },
};
</script>
