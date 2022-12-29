import Network from "./Network";
import dealy from '../common/delay';
import {NetworkConfig, InterceptorResponseValue} from './types'
// TODO
const _delay = (params: {
  delayTime: number,
  res: string,
}) => dealy(params?.delayTime, params?.res);


const networkRequest = new Network(
  {
    delayTime: 5000,
    res: 'xxxx',
  },
  _delay,
);

networkRequest.interceptors.request.use((config: NetworkConfig) => {
  console.log(config)
  return new Promise((resolve) => {
    resolve({
      ...config,
      res: '111'
    });
  });
})

networkRequest.interceptors.response.use((config: NetworkConfig) => {
  return new Promise((resolve) => {
    resolve(config);
  });
})

const request = networkRequest.request();



request.then(res => {
  console.log(333,  res);
})