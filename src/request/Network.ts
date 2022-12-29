import InterceptorManager from "./Network.Interceptor";
import { NetworkConfig, InterceptorResponseValue, ChainItem } from './types';

export default class Network {
  networkRequest
  defaultConfig: NetworkConfig = {};
  interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager(),
  };
  constructor(instanceConfig: NetworkConfig, networkRequest: Function) {
    this.defaultConfig = instanceConfig;
    this.networkRequest = networkRequest;
  }

  request(config?: NetworkConfig) {
    // 初始化请求配置
    const _config = Object.assign({}, this.defaultConfig, config);

    // 初始化拦截器延迟对象
    let _promise: Promise<NetworkConfig | InterceptorResponseValue> = Promise.resolve(_config);

    // 创建拦截器队列
    const _chain = [this.networkRequest, undefined];

    // 将请求拦截器按照添加顺序的倒序前置到拦截器队列的前端
    this.interceptors.request.forEach(handler => {
      _chain.unshift(handler.fulfilled, handler.rejected);
    });

    // 将响应拦截器按照添加顺序的后置到拦截器队列的后端
    this.interceptors.response.forEach(handler => {
      _chain.push(handler.fulfilled, handler.rejected);
    });



    // 将拦截器队列串到一起
    while (_chain.length) {
      _promise = _promise.then(_chain.shift() as ChainItem, _chain.shift() as ChainItem)
    }

    return _promise;
  }
}