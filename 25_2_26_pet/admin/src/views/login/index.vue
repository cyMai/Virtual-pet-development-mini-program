<template>
  <div class="login-main">
    <!-- 登录主题 -->
    <div class="input-main">
      <div class="login-title">宠物后台管理系统登录</div>
      <div>
        <div class="label">账号</div>
        <div>
          <el-input
              v-model="loginInfo.number"
              placeholder="请输入账号"
              clearable
          ></el-input>
        </div>
      </div>
      <div>
        <div class="label">密码</div>
        <div>
          <el-input
              v-model="loginInfo.pws"
              type="password"
              placeholder="请输入密码"
              clearable
          ></el-input>
        </div>
      </div>
      <div>
        <div class="label">验证码</div>
        <div>
          <el-row>
            <el-col :span="17">
              <el-input
                  v-model="loginInfo.verificationCode"
                  placeholder="请输入验证码"
                  clearable
              ></el-input>
            </el-col>
            <el-col :span="5">
              <VerifyCode/>
            </el-col>
          </el-row>
        </div>
      </div>
      <div style="display: flex;margin: 10px auto">
        <!--        <el-radio v-model="loginInfo.userPermissions" label="普通用户">普通用户</el-radio>-->
        <el-radio v-model="loginInfo.userPermissions" label="管理员">管理员</el-radio>
      </div>
      <div>
        <el-button type="primary" style="width: 100%" @click="login">
          登录
        </el-button>
        <!--        <el-button  style="width: 100%;margin-top: 10px;margin-left:0px" @click="toregister">-->
        <!--          注册-->
        <!--        </el-button>-->


      </div>
    </div>
  </div>
</template>

<script>
import VerifyCode from '../../components/VerificationCode'
import {login} from "@/api/project/user";

export default {
  components: {
    VerifyCode,
  },
  data() {
    return {
      loginInfo: {
        number: '',
        pws: '',
        verificationCode: '',
        userPermissions: "管理员"
      },
    }
  },
  methods: {
    // toregister(){
    //    this.$router.push('/register')
    // },
    login() {
      if (!this.loginInfo.number) {
        this.$message.error('请输入账号')
        return
      }
      if (!this.loginInfo.pws) {
        this.$message.error('请输入密码')
        return
      }
      if (!this.loginInfo.verificationCode) {
        this.$message.error('请输入验证码')
        return
      }

      if (this.loginInfo.verificationCode !== localStorage.getItem("identifyCode")) {
        this.$message.error('验证码错误')
        return
      }


      login({
        userAccount: this.loginInfo.number,
        userPassword: this.loginInfo.pws,
        userPermissions: this.loginInfo.userPermissions,
      }).then(res => {
        if (res.data.length == 0) {
          // 弹出通知框提示登录失败信息
          this.$message.error("账号或密码输入错误");

        } else {
          localStorage.setItem('userInfo', JSON.stringify(res.data[0]))
          // 弹出通知框提示登录成功信息
          this.$message.success("登陆成功");

          this.$router.push('/gameRecord')

        }
      })

    },
  },
}
</script>

<style scoped lang="less">
.login-main {

  position: absolute;
  width: 100%;
  height: 100%;
  background-image: url('../../assets/loginbg2.png');
  background-size: 100% 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  .input-main {
    opacity: 0.9;
    width: 500px;
    height: 500px;
    background-color: white;
    border-radius: 5px;
    padding: 40px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 20px;
  }
}

.login-title {
  color: #409eff;
  font-size: 25px;
  font-weight: 700;
  display: flex;
  justify-content: center;
}

.label {
  margin-bottom: 10px;
}
</style>
