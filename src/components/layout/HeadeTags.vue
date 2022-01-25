<template>
  <div class="nstc-header-tags">
    <el-tabs class="nstc-header-tags-left" v-model="activeTabs" @tab-remove="removeTab" @tab-click="pageGo">
      <el-tab-pane
        v-for="(item, index) in routerTabs"
        :key="item.index"
        :label="item.name"
        :query="item.query"
        :params="item.params"
        :path="item.path"
        :name="item.path"
        :closable="index !== 0 && findSelf(item)"
      ></el-tab-pane>
    </el-tabs>
    <el-dropdown v-if="routerTabs.length > 1" class="nstc-header-tags-right">
      <i class="iconfont ns-tag-del"></i>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item v-if="$route.path !== '/pms/home'" @click.native="handlePageGo(1)">关闭当前</el-dropdown-item>
        <el-dropdown-item v-if="routerTabs.length > 2 || $route.path === '/pms/home'" @click.native="handlePageGo(2)">关闭其他</el-dropdown-item>
        <el-dropdown-item @click.native="handlePageGo(3)">关闭所有</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import _ from 'lodash';
export default {
  data () {
    return {
      activeTabs: '',
    };
  },
  computed: {
    ...mapState({
      routerTabs: 'openedRouterList',
    }),
  },
  methods: {
    // 移除tag页签 默认标签的name值
    removeTab (delPath) {
      this.$store.dispatch('emptyRouterList',  //关闭标签添加清除对应页面缓存
        [
          [delPath.split('/')[delPath.split('/').length -3 ]],
          [delPath.split('/')[delPath.split('/').length -1 ]]
        ]
      );
      let RouteList = _.filter(this.routerTabs, el => el.path !== delPath);
      this.$store.dispatch('updateRouters', RouteList).then(() => {
        //如果当前节目为显示界面 删除后默认跳转最后一个页签路由
        if (delPath === this.$route.path) {
          let preRoute = this.routerTabs[this.routerTabs.length - 1];
          this.$router.push({ path: preRoute.path, query: preRoute.query });
        }
      });
    },
    findSelf (item) {
      return (this.$route.path.indexOf(item.path) !== -1 && item.path === this.$route.path) || this.$route.path.indexOf(item.path) === -1;
    },
    // 点击页签调整 选中tab实例
    pageGo (event) {
      this.$router.push({
        path: event.$attrs.path,
        query: event.$attrs.query ? event.$attrs.query : {},
      });
    },
    // 1关闭当前 2关闭其他 3关闭所有
    handlePageGo (type) {
      let delPath = this.$route.path;
      if (type === 1) {
        if (delPath !== '/pms/home') {
          this.removeTab(delPath);
        }
      } else if (type === 2) {
        let RouteList = _.filter(this.routerTabs, el => ['/pms/home', delPath].includes(el.path));
        this.$store.dispatch('updateRouters', RouteList);
      } else {
        let RouteList = _.filter(this.routerTabs, el => el.path === '/pms/home');
        this.$store.dispatch('updateRouters', RouteList);
        this.$router.push('/pms/home');
      }
    },
    findRouter () {
      let hasTab = _.find(this.routerTabs, el => this.$route.path.indexOf(el.path) !== -1);
      return hasTab;
    },
  },
  watch: {
    //  监听路由变化---立即执行 tabs默认赋值
    $route: {
      handler () {
        this.activeTabs = this.findRouter() ? this.findRouter().path : '';
      },
      immediate: true,
    },
    routerTabs: {
      handler (val, oldval) {
        // let data = this.$store.state.emptyRouterList; 勿删除,暂时保留。残留逻辑
        // let routerList = [];
        // data.map(item =>{
        //   val.map(element => {
        //     let arr = element.path.split('/');
        //     if(item != arr[arr.length -1]) {
        //       routerList.push(item);
        //     }
        //   });
        // });
        if(val.length > oldval.length) {
          this.$store.dispatch('emptyRouterList', [[],[]]); //打开新页面需缓存,清空集合中删除对应
        }
      },
      deep: true,
    },
  },
};
</script>
<style lang="less" scoped>
.nstc-header-tags {
  display: flex;
  justify-content: space-between;
  height: 32px;
  background: #fff;
  border-radius: 0px 4px;
  /deep/.el-tabs__nav-scroll {
    background: #fff;
  }
  /deep/ .el-tabs__item {
    font-size: 12px;
    padding: 0 12px;
    height: 32px;
    line-height: 32px;
    color: #999;
    position: relative;
    .el-icon-close {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
    }
    &.is-active {
      color: #448eff;
    }
    &:hover {
      color: #448eff;
    }
  }
  /deep/ .el-tabs__item:nth-child(n + 3) {
    padding-right: 22px !important;
    &::before {
      content: ' ';
      position: absolute;
      left: 0;
      top: 10px;
      width: 1px;
      height: 16px;
      border-left: 1px solid #f2f2f2;
      transform: scaleX(0.5);
    }
  }
  /deep/.el-tabs__nav-next,
  /deep/ .el-tabs__nav-prev {
    line-height: 32px;
    .el-icon-arrow-left,
    .el-icon-arrow-right {
      font-size: 12px;
    }
  }

  /deep/ .el-tabs__nav-wrap::after {
    background: transparent;
  }
  .nstc-header-tags-left {
    padding-left: 12px;
    width: calc(100% - 48px);
  }
  .nstc-header-tags-right {
    width: 32px;
    line-height: 32px;
    cursor: pointer;
    i {
      margin-left: 6px;
      font-size: 14px;
    }
  }
}
</style>
