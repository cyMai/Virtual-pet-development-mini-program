<template>
  <!-- 随机生成验证码 -->
  <div class="verify-main" @click="refreshCode">
    <sidentify :identifyCode="identifyCode"></sidentify>
  </div>
</template>

<script>
import sidentify from '../../components/VerificationCode/sIdentify.vue'
export default {
  components: {
    sidentify,
  },
  data() {
    return {
      identifyCode: '',
    }
  },
  mounted() {
    this.refreshCode()
  },
  methods: {
    refreshCode() {
      this.identifyCode = ''
      this.makeCode(5)
      localStorage.setItem("identifyCode",this.identifyCode)
    },
    randomNum(min, max) {
      max = max + 1
      return Math.floor(Math.random() * (max - min) + min)
    },
    // 随机生成验证码字符串
    makeCode(len) {
      let randomKey = '0123456789'
      for (let i = 0; i < len; i++) {
        this.identifyCode += randomKey[this.randomNum(0, randomKey.length - 1)]
      }

    },
  },
}
</script>

<style scoped>
.verify-main {
  width: 100%;
  height: 100%;
}
</style>
