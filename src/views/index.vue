<template>
  <el-container class="nstc-main">
    <el-header class="nstc-header" height="52px">
      <NavBar></NavBar>
    </el-header>
    <el-container class="nstc-content">
      <el-aside class="nstc-aside">
        <el-scrollbar style="height:100%">
          <Sidebar></Sidebar>
        </el-scrollbar>
      </el-aside>
      <el-main class="nstc-view">
        <HeadeTags></HeadeTags>
        <el-scrollbar style="height:calc(100% - 32px)">
          <keep-alive :exclude="routerOneName">
            <router-view class="nstc-router-view"></router-view>
          </keep-alive>
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import NavBar from '@/components/layout/NavBar.vue';
import Sidebar from '@/components/layout/Sidebar.vue';
import HeadeTags from '@/components/layout/HeadeTags.vue';
import { mapState } from 'vuex';
import { Buffer } from '@/mixins';
import _ from 'lodash';
export default {
  name: 'home',
  moduleName: 'home',
  mixins: [Buffer],
  components: {
    NavBar,
    Sidebar,
    HeadeTags,
  },
  computed: {
    ...mapState({
      permission: state => {
        return state.permission;
      },
    }),
  },
  watch: {
    // 监听路由鉴权
    $route: {
      handler (route) {
        let toPer = _.find(this.permission, el => {
          return route.meta.index === el.menuCode || (route.meta.parent && route.meta.parent === el.menuCode);
        });
        if (toPer) {
          // 写入菜单id
          route.meta.menuId = toPer.id;
        } else {
          if (route.path !== '/pms/home') {
            // 移除进入浏览器历史记录   暂时隐藏
            //this.$router.replace('/pms/err');
          }
        }
      },
      immediate: true,
    },
  },

  // // 路由更新鉴权---弃用
  // beforeRouteUpdate(to, form, next) {
  //   let toPer = _.find(this.permission, (el) => el.menuCode === to.meta.index);
  //   if (toPer) {
  //     // 写入菜单id
  //     to.meta.menuId = toPer.id;
  //     // 移除进入浏览器历史记录
  //     if (form.name === 'err_view') {
  //       next({ replace: true });
  //     } else {
  //       next();
  //     }
  //   } else {
  //     // 移除进入浏览器历史记录
  //     if (to.name === 'err_view') {
  //       next({ replace: true });
  //     } else {
  //       next({ path: '/pms/err', replace: true });
  //     }
  //   }
  // },
};
</script>
<style lang="less" scoped>
.nstc-main {
  height: 100%;
  width: 100%;
  /deep/ .el-header {
    padding: 0 18px;
    box-shadow: 0px 2px 6px 0px rgba(126, 92, 92, 0.1);
    z-index: 9;
  }
  .nstc-header {
    background: #fff;
    color: #409eff;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .nstc-content {
    height: calc(100% - 52px);
    .nstc-aside {
      width: 88px !important;
      height: 100%;
      background: url(../assets/bk-prices.png) no-repeat;
      color: white;
      background-size: 100% 100%;
    }
    .nstc-view {
      background: #f7f6fb;
      padding: 0;
      .nstc-router-view {
        box-sizing: border-box;
        height: 100%;
        width: 100%;
        padding: 8px 12px 12px;
      }
    }
  }
}
</style>
