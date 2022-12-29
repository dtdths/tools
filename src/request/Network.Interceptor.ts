import { InterceptorManagerHandler, InterceptorResponseFunc, InterceptorRequestFunc } from './types';

/**
 * 拦截器
 */
export default class InterceptorManager {
  // 拦截器
  handlers: InterceptorManagerHandler[] = [];

  /**
   * 添加拦截器
   * @param {InterceptorResponseFunc | InterceptorRequestFunc} fulfilled Promise
   * @param {any} rejected Promise
   * @param options 
   * @returns {Number} 返回index，也就是id
   */
  use(fulfilled: InterceptorResponseFunc | InterceptorRequestFunc, rejected?: any, options?: any) {
    this.handlers.push({
      fulfilled,
      rejected,
      options,
    });
    return this.handlers.length - 1;
  }

  /**
   * 删除拦截器
   * @param id 
   */
  eject(id: number) {
    if(this.handlers[id]) {
      this.handlers.splice(id, 1);
    }
  }

  clear() {
    this.handlers = [];
  }


  /**
   * 遍利执行
   * @param fn 
   */
  forEach(fn: (h: InterceptorManagerHandler) => any) {
    this.handlers.forEach((handler: InterceptorManagerHandler) => {
      fn(handler);
    });
  }
}
