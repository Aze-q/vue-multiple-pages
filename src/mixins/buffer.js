/**
 * 根据页签决定组件缓存机制
 */
import { mapState } from 'vuex';
export default {
  moduleName: '',
  computed: {
    ...mapState({
      routerName: state => {
        return state.emptyRouterList[1];
      },
      routerOneName: state => {
        return state.emptyRouterList[0];
      },
      hasOutRouter (state) {
        return true || state;  //全部页面缓存
      },
    }),
  },
};
