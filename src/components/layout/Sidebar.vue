<template>
  <div class="nstc-aside">
    <el-menu
      class="nstc-menu-list"
      collapse
      background-color="transparent"
      text-color="#fff"
      active-text-color="#fff"
    >
      <template v-for="(seniorItem, index) in menulist">
        <!-- 存在子节点 -->
        <template>
          <el-submenu
            v-if="seniorItem.children"
            :key="index"
            :index="index + seniorItem.path"
            :class="[
              'nstc-menu-item',
              `nstc-menu-${index}`,
              classActive(seniorItem),
            ]"
          >
            <!-- 一级菜单 -->
            <template slot="title">
              <!-- 'iconfont' 自定义需添加此类名并移除element icon类名 -->
              <i
                :class="['nstc-menu-item-icon iconfont', seniorItem.meta.icon]"
              ></i>
              {{ seniorItem.meta.title }}
            </template>
            <div
              class="nstc-menu-item-right-sub"
              @mouseenter="
                () => {
                  handleEnter(`nstc-menu-${index}`);
                }
              "
            >
              <template v-for="(sub, kidx) in seniorItem.children">
                <!-- 判断二级菜单权限 -->
                <template>
                  <div class="nstc-sub-item" :key="kidx">
                    <!-- 二级分组菜单名称start -->
                    <p
                      class="nstc-sub-item-title"
                      @click.prevent="handleExpend(sub.path)"
                    >
                      <i
                        :id="'nstc-expend-menu' + sub.path"
                        style="font-size: 14px; margin-right: 4px"
                        :class="['el-icon-caret-bottom']"
                      ></i>
                      {{ sub.meta.title }}
                    </p>
                    <!-- 二级分组菜单名称end -->
                    <!-- 三级菜单start -->
                    <ul
                      :id="'nstc-expend-content' + sub.path"
                      class="nstc-sub-item-content"
                    >
                      <template v-for="(subItem, subIndex) in sub.children">
                        <!-- 判断三级菜单权限 -->
                        <li
                          :key="subIndex"
                          @click="pageGo(true, seniorItem, sub, subItem)"
                          :class="[
                            findChild(subItem) &&
                              'nstc-sub-item-content-tag-active',
                            'nstc-sub-item-content-tag',
                          ]"
                        >
                          {{ subItem.meta.title }}
                          <i
                            class="
                              el-icon-arrow-right
                              nstc-sub-item-content-tag-arrow
                            "
                            v-if="$route.name === subItem.name"
                          ></i>
                        </li>
                      </template>
                    </ul>
                    <!-- 三级菜单end -->
                  </div>
                </template>
              </template>
            </div>
          </el-submenu>
          <!-- 不存在子节点 -->
          <el-menu-item
            v-else
            :key="index"
            :class="['nstc-menu-item', classActive(seniorItem)]"
            @click="pageGo(false, seniorItem)"
          >
            <i
              :class="['nstc-menu-item-icon iconfont', seniorItem.meta.icon]"
            ></i>
            {{ seniorItem.meta.title }}
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>
<script>
import _ from 'lodash';
import $ from 'jquery';
import { mapState } from 'vuex';
export default {
  computed: {
    menulist () {
      let routers = this.$router.options.routes || [];
      if (!_.isEmpty(routers)) {
        // 过滤系统layout主页面
        let menuObj = _.find(routers, el => el.name === 'pms');
        if (menuObj) {
          return _.filter(menuObj.children, el => el.name !== 'err_view');
        }
        return [];
      }
      return [];
    },
    ...mapState({
      routerTabs: 'openedRouterList'
    }),
  },
  methods: {
    // 展开分组菜单
    handleExpend (path) {
      $('#nstc-expend-menu' + path).toggleClass('el-move-close');
      $('#nstc-expend-menu' + path).toggleClass('el-move-expend');
      $('#nstc-expend-content' + path).slideToggle(200);
    },
    // 菜单跳转把当前路由写入store
    pageGo (isGroup, seniorMenu, subMenu, subItemMenu) {
      let routers = _.cloneDeep(this.routerTabs);
      let postData = {};
      let path = '';
      if (isGroup) {
        path = `/pms/${seniorMenu.path}/${subMenu.path}/${subItemMenu.path}`;
        postData = {
          name: subItemMenu.meta.title,
          path,
          index: subItemMenu.meta.index,
          routeName: subItemMenu.name,
        };
      } else {
        path = `/pms/${seniorMenu.path}`;
        postData = {
          name: seniorMenu.meta.title,
          path,
          index: seniorMenu.meta.index,
          routeName: seniorMenu.name,
        };
      }
      this.$router.push(path);
      routers.push(postData);
      let arr = [];
      let filterRouters = _.reduce(
        routers,
        (total, item) => {
          if (!arr.includes(item.path)) {
            arr.push(item.path);
            total.push(item);
          }
          return total;
        },
        []
      );
      this.$store.dispatch('updateRouters', filterRouters);
    },
    // 判断当前激活一级菜单
    classActive (sub) {
      let metaIdx = this.$route.meta.index.split('-');
      if (metaIdx[0] === sub.meta.index) {
        return 'nstc-menu-item-active';
      }
      return '';
    },
    // 匹配是否包含于菜单路由
    findChild (subItem) {
      // index不相同的情况判断是否有父级parent
      return (
        this.$route.meta.index === subItem.meta.index ||
        (this.$route.meta.parent &&
          this.$route.meta.index.startsWith(subItem.meta.index))
      );
    },
    //
    handleEnter (cls) {
      $(`.${cls}`).addClass('nstc-menu-item-active');
    },
  },
};
</script>
<style lang="less" scoped>
.nstc-menu-list {
  width: 100%;
  height: 100%;
  font-size: 12px;
  box-sizing: border-box;
  .nstc-menu-item,
  .nstc-menu-item > .nstc-menu-item-content {
    display: flex;
    width: 100%;
    height: 68px;
    padding: 0 !important;
    line-height: normal;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-size: 12px;
    background-color: inherit !important;
    &:hover {
      background: #0048de !important;
    }
    &.nstc-menu-item-active {
      background: #0048de !important;
    }
    /deep/ .el-submenu__title {
      width: 100%;
      height: 100%;
      display: flex;
      font-size: 12px;
      line-height: normal;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      &:hover {
        background: #0048de !important;
      }
    }
    .nstc-menu-item-icon {
      color: #fff;
      margin-bottom: 6px;
      font-size: 20px;
    }
    .nstc-menu-item-level {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: relative;
      & > a {
        position: absolute;
        height: 100%;
        text-align: center;
      }
    }
  }
}
.nstc-sub-item:not(:last-child) {
  font-weight: bold;
  margin-bottom: 4px;
}

.nstc-sub-item-title {
  cursor: pointer;
  font-weight: bold;
  font-size: 14px;
  height: 36px;
  line-height: 36px;
}
.nstc-sub-item-content {
  font-weight: normal;
  font-size: 12px;
  .nstc-sub-item-content-tag {
    display: flex;
    height: 36px;
    font-size: 12px;
    line-height: 36px;
    padding-left: 28px;
    border-radius: 8px 0 0 8px;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    &:hover {
      background: #0048de !important;
      box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.1);
    }
  }
}
.nstc-sub-item-content-tag-active {
  background: #0048de;
  box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.1);
  position: relative;
  &::before {
    content: "";
    position: absolute;
    left: -24px;
    top: 0%;
    width: 5px;
    height: 100%;
    background-color: #0048de;
    border-radius: 2px;
  }
  &::after {
    content: "";
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background-color: #fff;
  }
  .nstc-sub-item-content-tag-arrow {
    margin-right: 12px;
  }
}
.el-move-expend {
  transition: transform 0.2s;
  transform: rotatez(0deg);
}
.el-move-close {
  transition: transform 0.2s;
  transform: rotatez(-90deg);
}
</style>
