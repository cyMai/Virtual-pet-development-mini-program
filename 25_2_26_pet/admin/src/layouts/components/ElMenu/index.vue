<template>
  <div>
    <el-menu
      :default-active="$route.path"
      :unique-opened="true"
      background-color="#fff"
      active-text-color="#999"
      class="el-menu-vertical-demo"
    >
      <MenuItem
        v-for="(route, index) in routersList"
        :key="index"
        :item="route"
        :fatherPath="route.path"
      ></MenuItem>
    </el-menu>
  </div>
</template>

<script>
import routers from "../../../router";
import MenuItem from "./MenuItem.vue";
import Layouts from "@/layouts";
export default {
  components: {
    MenuItem,
  },
  data() {
    return {
      routersList: [],
    };
  },
  mounted() {
    // 获取所有定义的一级菜单和多级菜单
    console.log("routers",routers.options.routes[0].children)
    console.log("userInfo",JSON.parse(localStorage.getItem("userInfo")) )
    // if(JSON.parse(localStorage.getItem("userInfo")).userPermissions == ""){}

    this.routersList = routers.options.routes[0].children;
  },
};
</script>
