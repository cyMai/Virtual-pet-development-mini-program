<template>
  <div class="login-main">
    <!-- 登录主题 -->
    <div class="input-main">
      <div class="login-title">宠物后台管理系统注册</div>
      <div>
        <el-form ref="form" :model="form" label-width="90px">
          <el-row :gutter="20"> <!-- 设置列之间的间隔 -->
            <el-col :span="12">
              <el-form-item label="头像">
                <imageUpload v-model="form.userPic"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="账号" prop="userAccount">
                <el-input v-model="form.userAccount" placeholder="请输入账号"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="密码" prop="userPassword">
                <el-input v-model="form.userPassword" placeholder="请输入密码" type="password"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="姓名" prop="userNickname">
                <el-input v-model="form.userNickname" placeholder="请输入姓名"/>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="手机号" prop="userPhone">
                <el-input v-model="form.userPhone" placeholder="请输入手机号"/>
              </el-form-item>
            </el-col>


            <el-col :span="12">
              <el-form-item label="性别" prop="userSex">
                <el-select v-model="form.userSex" placeholder="请选择性别">
                  <el-option label="男" value="男"/>
                  <el-option label="女" value="女"/>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>

      </div>
      <div>
        <div class="label">验证码</div>
        <div>
          <el-row>
            <el-col :span="12">
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
        <el-button type="primary" style="width: 100%" @click="register">
          注册
        </el-button>
        <el-button style="width: 100%;margin-top: 10px;margin-left:0px" @click="tologin">
          登录
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import VerifyCode from '../../components/VerificationCode'
import {register} from "@/api/project/user";

export default {
  components: {
    VerifyCode,
  },
  data() {
    return {
      form: {},
      loginInfo: {
        number: '',
        pws: '',
        verificationCode: '',
        userPermissions: "管理员"
      },
    }
  },
  methods: {
    tologin() {
      this.$router.push('/login')
    },

    register() {
      if (!this.form.userAccount) {
        this.$message.error('请输入账号')
        return
      }
      if (!this.form.userPassword) {
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

      this.form.userPermissions = this.loginInfo.userPermissions

      register(this.form
      ).then(res => {
        if (res.data == "该账号已经注册过") {
          this.$message.error(res.data);
        } else {
          this.$message.success("注册成功");
          this.$router.push('/login')
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
    width: 722px;
    height: 800px;
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
