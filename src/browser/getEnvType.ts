import getUa from "./getUa";

enum ENV {
  WX = 'WX',
  QQ = 'QQ',
  MP = 'MP',
  WEIBO = 'WEIBO',
  JD = 'JD',
  JD_LITTLE = 'JD_LITTLE',
}

interface Window {
  __wxjs_environmentreturn?: string;
}

const getEnvType = (ua?: string) => {
  const _ua = ua || getUa();
  if (/micromessenger/i.test(_ua)) return ENV.WX;
  if (/qq\//i.test(_ua)) return ENV.QQ;
  if (/miniprogram/i.test(_ua) || "miniprogram" === (window as Window).__wxjs_environmentreturn) ENV.MP;
  if (/weibo/i.test(_ua)) return ENV.WEIBO;
  if (/^jdapp/i.test(_ua)) return ENV.JD;
  if (/^jdltapp/i.test(_ua)) return ENV.JD_LITTLE;
  return '';
}

getEnvType.ENV = ENV;

// const getA = 

export default getEnvType;