<template>
  <div class="ns-login"
       v-loading="loading">
    <div class="login-main">
      <div class="main-header">
        <img src="@/assets/logo_white.png" />
      </div>
      <el-row class="main-content">
        <img class="content-left"
             src="@/assets/art_base.png" />
        <div class="content-right">
          <h3 class="content-form-title">欢迎登录</h3>
            <ul :class="active?'active':''" class="content-form-active" >
              <li @click="formActive"  :class="!active?'active':''">
                账号登录
              </li>
              <li @click="formActive"  :class="active?'active':''">
                短信登录
              </li>
            </ul>
          <el-form class="content-form"
                   :model="form"
                   :rules="rules"
                   v-if="!active"
                   ref="form">
            <el-form-item prop="loginId">
              <el-input v-model="form.loginId"
                        ref="username"
                        placeholder="请输入账号"
                        :maxlength="50"
                        @keyup.native.enter="login">
                <i slot="prefix"
                   class="el-input__icon form-icon iconfont icon-user"></i>
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input ref="password"
                        placeholder="请输入密码"
                        v-model="form.password"
                        :maxlength="50"
                        @keyup.native.enter="login"
                        show-password
                        v-on:keyup.native.enter="login">
                <i slot="prefix"
                   class="el-input__icon form-icon iconfont icon-passwork"></i>
              </el-input>
            </el-form-item>
            <el-form-item prop="validateCode"
                          required>
              <div class="vacode">
                <el-input prefix-icon="icon iconfont icon-passwork"
                          class="vacodeinput"
                          ref="validateCode"
                          v-model="form.validateCode"
                          @keyup.native.enter="login('1')"
                          placeholder="请输入验证码"></el-input>
                <div class="identify"
                     @click="refreshCodes">
                  <ver-code :identifyCode="identifyCode" :contentWidth='200' :contentHeight="50"></ver-code>
                </div>
              </div>
            </el-form-item>
            <el-form-item>
              <el-button class="w100 form-btn"
                         type="primary"
                         @click="login('1')">登 录</el-button>
            </el-form-item>
          </el-form>
          <el-form class="content-form"
                   :model="form"
                   :rules="rules"
                   ref="form"
                   v-if="active">
            <el-form-item prop="loginId">
              <el-input v-model="form.loginId"
                        ref="username"
                        placeholder="请输入电话号码"
                        :maxlength="50"
                        @keyup.native.enter="login('2')">
                <i slot="prefix"
                   class="el-input__icon form-icon iconfont icon-user"></i>
              </el-input>
            </el-form-item>
            <el-form-item prop="validateCode"
                          required>
              <div class="checkword-con">
                <el-input v-model="form.validateCode"
                          ref="username"
                          placeholder="请输验证码"
                          :maxlength="50"
                          @keyup.native.enter="login('2')">
                  <i slot="prefix"
                     class="el-input__icon form-icon iconfont icon-passwork"></i>
                  <el-link type="primary"
                           :underline="false"
                           class="check-i"
                           :disabled='!codeShow'
                           @click="onCheckCode"
                           slot="suffix"><span v-if="codeShow">获取验证码</span><span v-else>{{count}}秒后重试</span></el-link>
                </el-input>
              </div>
            </el-form-item>
            <el-form-item>
              <el-button class="w100 form-btn"
                         type="primary"
                         @click="login('2')">登 录</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-row>
    </div>
    <div class="login-footer">
      <p>全球资金&nbsp;&nbsp;&nbsp;尽在掌握</p>
      <p>Copyright © 2021 Sky All Rights Reserved.</p>
      <p>http://www.skysz.com</p>
    </div>
  </div>
</template>
<script>
import VerCode from '@/components/VerCode';
export default {
  components: {
    VerCode,
  },
  data () {
    return {
      loading: false,
      form: {},
      rules: {},
      identifyCode:'456',
      active:false,
      count:'',
      codeShow: true,
    };
  },
  created () { },
  methods: {
    login (){
      let data = [
        {
          name: '首页',
          path: '/pms/home',
          index: '1',
          routeName: 'home_view',
        },
      ];
      this.$store.dispatch('updateRouters', data);
      this.$router.push('/pms/home');
    },
    formActive () {
      this.active = !this.active;
    },
    async onCheckCode () {
      try {
        if(!this.form.loginId) return this.$message.warning('请输入电话号码。');
        this.countDown();
        //判断
        // const { message, success } = await sendPhoneValidateCode({ loginId: this.form.loginId });
        // if (success) {
        //   clearInterval(this.timer);
        //   this.$message.success(message);
        // } else {
        //   this.$message.error(message);
        // }
      } catch (e) {
        console.log(e);
      }
    },
    countDown () {
      const TIME_COUNT = 60;  //倒计时60秒
      if (!this.timer) {
        this.count = TIME_COUNT;
        this.codeShow = false;
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--;
          } else {
            this.codeShow = true;
            clearInterval(this.timer);
            this.timer = null;
          }
        }, 1000);
      }
    },
    refreshCodes (){}
  },
};
</script>
<style lang="less" scoped>
.ns-login {
  height: 100%;
  position: relative;
  background: url("../../assets/bg_1920.png") no-repeat;
  background-size: 100% 100%;
  .login-main {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 960px;
    height: 472px;
    background: #ffffff;
    border-radius: 12px;
    .main-header {
      position: absolute;
      top: -26px;
      left: 50%;
      transform: translateX(-50%);
      width: 40%;
      height: 52px;
      color: #fff;
      background: linear-gradient(82deg, #4098ff 0%, #4440ff 100%);
      border-radius: 80px;
      display: flex;
      justify-content: center;
      align-items: center;
      & > img {
        height: 30px;
      }
      .header-txt {
        border-left: 2px solid rgba(255, 255, 255, 0.6);
        color: #fff;
        letter-spacing: 0.5px;
        font-size: 16px;
        font-family: Microsoft YaHei, Microsoft YaHei-Regular;
        font-weight: 400;
        padding-left: 12px;
      }
    }
    .main-content {
      display: flex;
      .content-left {
        width: 490px;
        margin-top: 70px;
      }
      .content-right {
        margin-top: 50px;
        flex: 1;
        .content-form-title {
          line-height: 36px;
          font-size: 16px;
          font-weight: 400;
          color: #33445e;
          letter-spacing: 1px;
          text-align: center;
        }
        .content-form-active {
          margin-top: 20px;
          margin-bottom: 30px;
          font-size: 14px;
          font-weight: 400;
          color: #999;
          text-align: CENTER;
          line-height: 40px;
          font-family: Microsoft YaHei, Microsoft YaHei-Regular;
          display: flex;
          text-align: center;
          justify-content: center;
          position: relative;
          li {
            width: 180px;
            height: 40px;
            border-radius: 8px;
            cursor:pointer;
          }
          li.active{
              color: #fff;
            }
          &::before{
            background: #448eff;
            height: 40px;
            content: '';
            width: 180px;
            border-radius: 8px;
            position: absolute;
            left: 55px;
            z-index: -1;
            transition: left 0.2s;
          }
        }
        .active.content-form-active {
            &::before{
              left: 235px;
            }
          }
        .form-icon {
          font-size: 16px;
          color: #448eff;
          line-height: 40px;
        }
        .content-form {
          width: 360px;
          margin: 16px auto 0;
        }
        /deep/.el-form-item {
          margin-right: 0 !important;
          margin-bottom: 28px !important;
          .el-input .el-input__inner,
          .form-btn {
            height: 40px;
            font-size: 14px;
            border-radius: 2px;
          }
          .el-input--prefix .el-input__inner {
            padding-left: 40px;
          }
          .el-input__prefix {
            left: 14px;
            color: #448eff;
          }
          .checkword-con {
            display: flex;
            .checkword-ipt {
              width: 40%;
            }
            .checkword-code {
              cursor: pointer;
              border-radius: 2px;
            }
            .check-i {
              margin-top: 7px;
              margin-right: 10px;
            }
          }
        }
      }
    }
  }
  .login-footer {
    position: absolute;
    bottom: 16px;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    color: #fff;
    opacity: 0.6;
    line-height: 20px;
    & > p {
      font-size: 12px;
    }
  }
}
.vacode {
  display: flex;
  height: 40px;
  /deep/.el-input--mini {
    width: 132px;
  }
  .identify {
    cursor: pointer;
    margin: -4px 10px;
  }
}
@media screen and (max-width: 1366px) {
  .ns-login {
    background-image: url("../../assets/bg_1366.png");
  }
}
</style>
