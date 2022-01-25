<template>
  <div :class="['nstc-title-bar', hasMargin ? 'mb8' : '']">
    <div class="nstc-title-bar-txt">
      <img class="nstc-title-bar-txt-img"
           src="@/assets/title_bar.png" />
      <template v-if="$slots.title">
        <slot name="title"></slot>
      </template>
      <span v-else>
        {{ title }}
      </span>
    </div>
    <div class="nstc-title-bar-btns">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'title-bar',
  props: {
    title: {
      type: String,
      default: '',
    },
    hasMargin: {
      type: Boolean,
      default: true,
    },
  },
};
</script>
<style lang="less" scoped>
.nstc-title-bar {
  height: 28px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .nstc-title-bar-txt {
    display: flex;
    line-height: 28px;
    align-items: center;
    font-weight: bold;
    color: #33445e;
    font-size: 14px;
    .nstc-title-bar-txt-img {
      margin-right: 6px;
      width: 3px;
      height: 16px;
    }
    /deep/.el-breadcrumb {
      font-size: 14px;
      .el-breadcrumb__inner {
        color: #33445e;
        font-weight: 600 !important;
      }

      .el-breadcrumb__separator {
        margin: 0 2px !important;
        color: #448eff !important;
      }
      .is-link {
        color: #448eff;
        // text-decoration: underline;
      }
    }
  }
  .nstc-title-bar-btns {
    height: 28px;
    display: flex;
  }
}
</style>
