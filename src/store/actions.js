export default {
  //设置已打开路由集合
  updateRouters ({ commit }, data) {
    commit('setOpenedRouters', data);
  },
  //设置用户信息
  updateUsers ({ commit }, data) {
    commit('setUsers', data);
  },
  //设置不缓存菜单页面集合
  emptyRouterList ({ commit }, data) {
    commit('setEmptyRouterList', data);
  },
};
