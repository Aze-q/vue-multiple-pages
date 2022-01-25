<template>
  <div>
    首页
  </div>
</template>
<script>
import { mapState } from 'vuex';
// import _ from 'lodash';
export default {
  name: 'home',
  components: {},
  data () {
    return {};
  },
  computed: {
    ...mapState({
      routerTabs: 'openedRouterList'
    }),
  },
  mounted () { },
  methods: {},
};
</script>
<style lang="less"></style>
