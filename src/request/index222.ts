// import mergeWith from 'lodash/mergeWith';
// import debounce from 'lodash/debounce';
// import { BASE_URL, API_MAP, API_APPID_MAP } from '@/config/api';
// import Taro from '@tarojs/taro';
// import Network from './network';
// import networkRequest from './networkRequest';
// import { envType, h5Env, devicesType, h5CheckAndChangeAPIHostname, goLogin } from '../tools';

// let appSDK;
// if (process.env.TARO_ENV === 'h5') {
//   appSDK = require('@/utils/appSDK').default;
// }
// // 拍拍app信息，通过协议获取
// let PP_APP_PHONE_INFO;

// /**
//  * 设置color接口的client http://color.jd.com/help/fastPublish/httpCall
//  */
// const colorClient = () => {
//   // client https://cf.jd.com/pages/viewpage.action?pageId=166100166
//   let client = 'paipai_m';
//   if (envType === Taro.ENV_TYPE.WEB) {
//     // 微信手Q加参数
//     const isWxQQ = ['wx', 'qq'].includes(h5Env);

//     if (h5Env === 'xcx') {
//       client = 'm';
//     } else if (isWxQQ) {
//       // 微信手Q
//       client = 'wx';
//     } else if (['jd', 'paipai'].includes(h5Env) && devicesType) {
//       // App
//       client = {
//         jd_2: 'apple',
//         jd_1: 'android',
//         paipai_2: 'paipai_apple',
//         paipai_1: 'paipai_android',
//       }[`${h5Env}_${devicesType}`];
//     } else if (window.location.href.toLowerCase().indexOf('entryid=p005ppyj0jdm') !== -1) {
//       // 京东M站
//       client = 'm';
//     }
//   } else if (envType === Taro.ENV_TYPE.WEAPP) {
//     client = 'm';
//   }
//   return `&client=${client}`;
// };
// /**
//  * 设置color接口的loginType
//  */
// const colorLoginType = (requestConfig) => {
//   let loginType = '';
//   if (envType === Taro.ENV_TYPE.WEB) {
//     // 微信手Q加参数
//     const isWxQQ = ['wx', 'qq'].includes(h5Env);
//     loginType = requestConfig?.loginType
//       ? `&loginType=${requestConfig.loginType}`
//       : isWxQQ
//       ? '&loginType=1'
//       : '&loginType=2';

//     if (isWxQQ) {
//       // 设置color接口的loginWQBiz
//       loginType += '&loginWQBiz=huishou';
//     }
//   }
//   return loginType;
// };

// /**
//  * 拍拍app下，设置color接口客户端版本
//  */
// const colorClientVersion = () => {
//   if (process.env.TARO_ENV !== 'h5' || h5Env !== 'paipai' || !PP_APP_PHONE_INFO?.clientVersion)
//     return '';
//   try {
//     // app端接口clientVersion格式为 303000，ua获取为3.3.0
//     // 转换规则： 根据小数点分成三段，每段乘不同的值相加； 3*100000+1*1000+0*10
//     const versionNums = [100000, 1000, 10];
//     const resault = PP_APP_PHONE_INFO.clientVersion
//       ?.split('.')
//       ?.slice(0, 3)
//       ?.reduce((pv, cv, i) => {
//         return pv + cv * versionNums[i];
//       }, 0);
//     if (Number.isNaN(resault)) {
//       return '';
//     } else {
//       return `&clientVersion=${resault}`;
//     }
//   } catch (e) {}
//   return '';
// };

// // 引入小程序登录组件
// const loginPlugin = envType === Taro.ENV_TYPE.WEAPP ? Taro.requirePlugin('loginPlugin') : null;

// // 业务接口code码对应的错误信息
// const codeMessage = {
//   200: '服务器成功返回请求的数据。',
//   201: '新建或修改数据成功。',
//   202: '一个请求已经进入后台排队（异步任务）。',
//   204: '删除数据成功。',
//   // 400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
//   401: '用户没有权限（令牌、用户名、密码错误）。',
//   // 403: '用户得到授权，但是访问是被禁止的。',
//   404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
//   406: '请求的格式不可得。',
//   410: '请求的资源被永久删除，且不会再得到的。',
//   422: '当创建一个对象时，发生一个验证错误。',
//   // 500: '服务器发生错误，请检查服务器。',
//   502: '网关错误。',
//   // 503: '服务不可用，服务器暂时过载或维护。',
//   504: '网关超时。',
//   400: '请求参数格式不正确',
//   // 401: "需要登录",
//   403: '没有权限',
//   500: '服务器异常',
//   // 501: '需要登录',
//   503: '服务器限流',
//   777: '未登录',
// };

// /**
//  * 防止短时间内重复跳转
//  * 第一时间跳转，后续500MS以内的跳转忽略
//  */
// const redirectToLogin = debounce(
//   (url) => {
//     goLogin({
//       redirectURL: url,
//       loginToURLredirectType: 'redirectTo',
//       toLoginRedirectType: 'redirectTo',
//     });
//   },
//   500,
//   {
//     leading: true,
//     trailing: false,
//   },
// );

// // color接口公参数据，上报页面路由
// let extObj;
// if (envType === Taro.ENV_TYPE.WEAPP) {
//   try {
//     const accountInfo = Taro.getAccountInfoSync();
//     const version = accountInfo.miniProgram.version || accountInfo.miniProgram.envVersion;
//     const appId = accountInfo.miniProgram.appId;
//     extObj = {
//       appId,
//       version,
//     };
//   } catch (error) {}
// }

// // 请求默认配置
// const defaultConfig = {
//   url: '', // 请求地址
//   data: {}, // 请求参数
//   timeout: 5000, // 超时时间
//   method: 'GET', // 请求方式
//   header: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
//   dataType: 'json', // 返回的数据类型
//   withCredentials: true, // 是否携带身份信息
//   // checkLogin: false, // 注意：该配置项用于请求前验证用户登录态，若用户未登录将自动进行登录操作，用户登录成功后再发送接口请求
//   autoLogin: false, // 是否根据接口返回数据的code进行，对401状态码情况进行登录页跳转
//   autoShowError: true, // 是否自动根据接口返回数据的code进行判断并提示错误信息
//   isColor: true, // 是否是color接口
//   // 对返回的data字段进行托底
//   // dataUnderlay: {
//   //   result: {}
//   // },
//   validateResponse: function (response, apiConf) {
//     const { code, result } = response || {};
//     if (apiConf.isColor) {
//       return code === 0 && result && ['0', '200'].includes(String(result.code));
//     }
//     return code === 200;
//   },
// };

// // 创建请求对象
// const requestInstance = new Network(defaultConfig, networkRequest);
// // 添加默认请求拦截器
// requestInstance.interceptors.request.use(...createDefaultRequestInterceptor());
// // 添加默认响应拦截器
// requestInstance.interceptors.response.use(...createDefaultResponseInterceptor());

// /**
//  * 请求API配置中的接口
//  * @param {String} apiKey api标识
//  * @param {Object} apiUserConfig  用户自定义配置
//  * @returns Promise
//  */
// export default function requestAPI(apiKey, apiUserConfig) {
//   if (!API_MAP.hasOwnProperty(apiKey)) {
//     return Promise.reject(new Error('未找到指定 api 配置'));
//   }
//   const _requestConfig = mergeWith({}, API_MAP[apiKey], apiUserConfig);
//   // console.log(`request-- ${apiKey}`, _requestConfig?.data?.body || {});
//   return requestInstance.request(_requestConfig);
// }

// // 创建默认请求拦截器
// // 对需要验证登录的接口，进行登录态验证过，未登录时进行跳转登录页的操作
// function createDefaultRequestInterceptor() {
//   let _onRejected, _onFulfilled;
//   _onFulfilled = function (requestConfig) {
//     if (requestConfig.withCredentials) {
//       if (envType === Taro.ENV_TYPE.WEB) {
//         // h5 跨域携带cookie，需配置
//         requestConfig.mode = 'cors';
//         requestConfig.credentials = 'include';
//       } else if (envType === Taro.ENV_TYPE.WEAPP) {
//         // weapp环境添加cookie
//         const [GUID = '', KEY = '', TOKEN = '', PIN = ''] = loginPlugin.getJdListStorage([
//             'guid',
//             'pt_key',
//             'pt_token',
//             'pt_pin',
//           ]),
//           _cookie = `guid=${GUID}; pt_pin=${encodeURIComponent(
//             PIN,
//           )}; pt_key=${KEY}; pt_token=${TOKEN}`,
//           { cookie } = requestConfig.header;
//         requestConfig.header = requestConfig.header || {};
//         requestConfig.header.cookie = cookie ? `${cookie};${_cookie}` : _cookie;

//         // 若当前未登录，且接口配置了自动跳转登录
//         if (!KEY && requestConfig.autoLogin) {
//           redirectToLogin(requestConfig?.loginReturnUrl);
//           return Promise.reject(new Error('用户未登录'));
//         }
//       }
//     }

//     if (requestConfig.isColor) {
//       // color接口公参ext
//       let ext;
//       if (envType === Taro.ENV_TYPE.WEAPP) {
//         try {
//           const current = Taro.getCurrentInstance();
//           const currentPagePath = current?.page?.route;
//           const { appId, version } = extObj;
//           ext = JSON.stringify({
//             referer: `${appId}/${version}/${currentPagePath}`,
//           });
//         } catch (error) {}
//       }
//       // 添加时间戳，防止浏览器缓存; 添加appid; 添加client; 添加loginType; 添加 loginWQBiz
//       requestConfig.url = `${BASE_URL.COLOR}/api?functionId=${requestConfig.functionId}&appid=${
//         envType === Taro.ENV_TYPE.WEAPP ? API_APPID_MAP.wx : requestConfig.appid || API_APPID_MAP.h5
//       }${colorClient()}${colorClientVersion()}${ext ? `&ext=${ext}` : ''}${colorLoginType(
//         requestConfig,
//       )}&t=${+new Date()}`;

//       if (requestConfig.method === 'POST') {
//         requestConfig.header['Content-Type'] = 'application/x-www-form-urlencoded';
//         if (requestConfig?.data?.body) {
//           requestConfig.data.body = JSON.stringify(requestConfig.data.body);
//         }
//       }
//     } else {
//       // TODO
//       // 设置解析登录态的方式
//       // PC(1, "PC"),
//       // M(2, "M"),
//       // APP(3, "APP"),
//       // WX(4, "微信"),
//       // QQ(5, "手机QQ"),
//       // PAIPAI(6, "拍拍APP"),
//       // WX_MINI(7, "微信小程序");
//       // requestConfig.data.p = 7;
//     }
//     requestConfig.url = h5CheckAndChangeAPIHostname(requestConfig.url);
//     return requestConfig;
//   };

//   // 再包装一层：拍拍app先获取并缓存appVersion
//   const _onPPAppFulfilled = (requestConfig) => {
//     if (process.env.TARO_ENV === 'h5' && h5Env === 'paipai' && !PP_APP_PHONE_INFO) {
//       return new Promise((resolve) => {
//         appSDK
//           .getPhoneInfo()
//           .then((phoneInfo) => {
//             if (!PP_APP_PHONE_INFO) {
//               PP_APP_PHONE_INFO = phoneInfo || {};
//             }
//             resolve(_onFulfilled(requestConfig));
//           })
//           .catch((e) => {
//             console.log(e);
//             if (!PP_APP_PHONE_INFO) {
//               PP_APP_PHONE_INFO = {};
//             }
//             resolve(_onFulfilled(requestConfig));
//           });
//       });
//     } else {
//       return _onFulfilled(requestConfig);
//     }
//   };
//   return [_onPPAppFulfilled, _onRejected];
// }

// // 创建默认响应拦截器
// // 验证响应是否正确
// // TODO:对未登录返回状态码，进行跳转登录页的操作
// function createDefaultResponseInterceptor() {
//   let _handler = (args) => {
//       const { response = {}, apiConfig: apiConf } = args;
//       try {
//         // 获取验证响应结果的方法
//         const { data = {} } = response || {};

//         // // 使用入参中的 dataUnderlay 托底数据结构
//         // if (apiConf.dataUnderlay && isPlainObject(data)) {
//         //   mergeWith(
//         //     data,
//         //     apiConf.dataUnderlay,
//         //     // eslint-disable-next-line consistent-return
//         //     (objValue, srcValue) => {
//         //       if (srcValue === null) {
//         //         return objValue;
//         //       }
//         //     }
//         //   );
//         // }

//         // // 分别打印接口参数、接口返回数据、托底后的数据
//         // logGroup({
//         //   title: `请求接口：${apiConf.url}`,
//         //   logs: [
//         //     ['请求参数：', apiConf.data],
//         //     ['响应结果：', data],
//         //   ],
//         // });

//         // 验证响应结果
//         const validateResult = apiConf.validateResponse(data, apiConf);
//         if (validateResult) {
//           if (apiConf.isColor) {
//             return Promise.resolve(data?.result);
//           }
//           return Promise.resolve(data);
//         }

//         // 以下为 validateResult 为 false 时的处理逻辑
//         let { msg, code } = data;
//         if (apiConf.isColor) {
//           code = data?.result?.code;
//           msg = data?.result?.message || data?.result?.msg || data?.result?.result;
//         }

//         // 自动显示提示
//         if (apiConf.autoShowError) {
//           const tempMessage = msg || codeMessage[code] || '服务忙，请稍后再试';
//           if (tempMessage) {
//             Taro.showToast({
//               title: tempMessage,
//               icon: 'none',
//               duration: 2000,
//             });
//           }
//         }

//         // 如果标识需要自动登录，则跳转到登录页
//         if (apiConf.autoLogin && ['777', 401].includes(code)) {
//           // 小程序环境可能存在ptKey过期，此时先退出登录
//           if (process.env.TARO_ENV === 'weapp' && loginPlugin.getPtKey()) {
//             return new Promise((_, reject) => {
//               loginPlugin.logout({
//                 callback() {
//                   redirectToLogin(apiConf?.loginReturnUrl);
//                   reject({
//                     ...args,
//                   });
//                 },
//               });
//             });
//           } else {
//             redirectToLogin(apiConf?.loginReturnUrl);
//           }
//         }

//         return Promise.reject({
//           ...args,
//         });
//       } catch (ex) {
//         return Promise.reject({ error: ex, ...args });
//       }
//     },
//     _onRejected = _handler,
//     _onFulfilled = _handler;
//   return [_onFulfilled, _onRejected];
// }
