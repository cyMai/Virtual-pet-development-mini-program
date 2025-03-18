import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import App from "./App.vue";
import router from "./router";
// 图片上传组件
import ImageUpload from "@/components/ImageUpload"
import FileUpload from "@/components/FileUpload"
import Editor from "@/components/Editor"

Vue.config.productionTip = false;

//设置ElementUI组件的默认大小
Vue.use(ElementUI, {
  size: 'medium'
})

Vue.component('ImageUpload', ImageUpload)
Vue.component('FileUpload', FileUpload)
Vue.component('Editor', Editor)

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
