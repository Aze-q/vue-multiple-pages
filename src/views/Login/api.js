import service from '@/utils/mserver.js';

//获取登录接口
export function fetchLogin (params) {
  return service({
    url: 'loginAction.action?method=login',
    method: 'post',
    params,
  });
}