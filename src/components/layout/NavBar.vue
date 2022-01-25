<template>
  <div class="nstc-header">
    <div class="nstc-header-left">
      <img class="mr12"
           src="@/assets/logo_bg.png" />
    </div>
    <div class="nstc-header-right">
      <el-dropdown @command="handleState">
        <div class="nstc-header-dropdown">
          <img class="nstc-header-face mr10"
               src="@/assets/user_default.png" />
          {{ '未知用户' }}
          <i class="nstc-header-arrow el-icon-caret-bottom el-icon--right"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="showInfo">
            <span><i class="nstc-header-icon iconfont ns-user"></i>个人信息</span>
          </el-dropdown-item>
          <el-dropdown-item command="showPass">
            <span><i class="nstc-header-icon iconfont ns-lock"></i>修改密码</span>
          </el-dropdown-item>
          <el-dropdown-item command="logout">
            <span><i class="nstc-header-icon iconfont ns-out"></i>退出系统</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
import { removeCookie } from '@/utils/cookie.js';
export default {
  name: 'nav-bar',
  props: {
    msg: String,
  },
  data () {
    return {
      searchParams: '',
    };
  },
  methods: {
    // 操作项
    handleState (command) {
      switch (command) {
      case 'logout':
        this.logout();
        break;
      case 'showPass':
        break;
      case 'showInfo':
        break;
      default:
        break;
      }
    },
    // 登出系统
    logout () {
      this.$router.push('/login');
      this.$nextTick(() => {
        localStorage.removeItem('store');
        this.$store.dispatch('updateRouters', []);
        this.$store.dispatch('updateUsers', {});
        removeCookie('UserId');
        removeCookie('loginToken');
        removeCookie('UserName');
      });
    },
  },
};
</script>

<style scoped lang="less">
.nstc-header {
  width: 100%;
  display: flex;
  justify-content: space-around;

  .nstc-header-left {
    height: 30px;
    display: flex;
    align-items: center;
    & > img {
      height: 100%;
    }
    .nstc-header-left-txt {
      border-left: 2px solid rgba(68, 142, 255, 0.6);
      font-size: 16px;
      font-weight: 700;
      color: #448eff;
      font-family: Microsoft YaHei, Microsoft YaHei-Bold;
      letter-spacing: 0.5px;
    }
  }
  .nstc-header-right {
    display: flex;
    align-items: center;
    font-size: 14px;
    .nstc-header-notice {
      margin: 0 20px;
      position: relative;
      height: 24px;
      width: 24px;
      img {
        height: 100%;
      }
      &:after {
        content: "";
        width: 6px;
        height: 6px;
        border-radius: 50%;
        position: absolute;
        right: 4px;
        top: 0;
        background-color: #ff4d4f;
      }
    }
    .nstc-header-dropdown {
      display: flex;
      align-items: center;
      cursor: pointer;
      line-height: 32px;
      .nstc-header-face {
        width: 32px;
        height: 32px;
        border-radius: 50%;
      }
      .nstc-header-arrow {
        font-size: 12px;
      }
    }
  }
}
.nstc-header-icon {
  color: #448eff;
  font-size: 14px;
}
</style>
