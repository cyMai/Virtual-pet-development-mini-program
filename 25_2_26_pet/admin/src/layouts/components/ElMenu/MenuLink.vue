<template>
  <!-- 设置动态组件 -->
  <component :is="type" v-bind="linkProps(to)">
    <slot></slot>
  </component>
</template>
<script>
export default {
  props: {
    // 接收从父组件传递过来的页面地址
    to: {
      type: String,
      default: "",
    },
  },
  computed: {
    // 计算属性判断当前页面地址是否为外部地址
    isExternal() {
      return /^(https?:|mailto:|tel:)/.test(this.to);
    },
    // 根据页面路径类型动态切换组件
    type() {
      if (this.isExternal) {
        return "a";
      } else {
        return "router-link";
      }
    },
  },
  data() {
    return {};
  },
  methods: {
    // 动态绑定标签属性
    linkProps(to) {
      // 如果是外部连接，则设置a标签的href、target、style属性
      if (this.isExternal) {
        return {
          href: to,
          target: "_blank",
          style: {
            "text-decoration": "none",
          },
        };
      } else {
        // 如果不是外部链接则设置 router-link的to属性和tag
        return {
          to: to,
          tag: "span",
        };
      }
    },
  },
};
</script>