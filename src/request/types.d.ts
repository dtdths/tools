// 拦截器项
export interface InterceptorManagerHandler {
  fulfilled: Function,
  rejected?: Function,
  [propname: string]: any,
}

export interface NetworkConfig{
  [propname: string]: any,
}

// export type InterceptorFunc = (value: NetworkConfig) => NetworkConfig | PromiseLike<NetworkConfig>;


export interface InterceptorResponseValue {
  response: any,
  apiConfig: NetworkConfig,
}

export type InterceptorResponseFunc = (res:any, value: NetworkConfig) => InterceptorResponseValue | PromiseLike<InterceptorResponseValue>;

export type InterceptorRequestFunc = (value: NetworkConfig) => NetworkConfig | PromiseLike<NetworkConfig>;

export type ChainItem = (value: NetworkConfig | InterceptorResponseValue) => InterceptorResponseValue | PromiseLike<InterceptorResponseValue>