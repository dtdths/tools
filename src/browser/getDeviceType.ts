import getUa from "./getUa";


function isIOS(ua?: string):boolean {
  const _ua = ua || getUa();
  return /ip(hone|od)|ipad/i.test(_ua)
}

function isAndroid(ua?: string):boolean {
  const _ua = ua || getUa();
  return /android/i.test(_ua) && !isIOS()
}

function isIPad(ua?: string):boolean{
  const _ua = ua || getUa();
  return !! /ipad/i.test(_ua);
}

function isIPhone(ua?: string):boolean{
  const _ua = ua || getUa();
  return !! /iphone/i.test(_ua)
}

function isMobile(ua?: string):boolean{
  const _ua = ua || getUa();
  return !! /ip(hone|od)|android.+mobile|windows (ce|phone)|blackberry|bb10|symbian|webos|firefox.+fennec|opera m(ob|in)i|polaris|iemobile|lgtelecom|nokia|sonyericsson|dolfin|uzard|natebrowser|ktf;|skt;/i.test(_ua)
}

function isTablet(ua?: string):boolean{
  const _ua = ua || getUa();
  return /ipad/i.test(_ua) || /android/i.test(_ua) && !/mobi|mini|fennec/i.test(_ua)
}


export default {
  isIOS,
  isAndroid,
  isIPad,
  isIPhone,
  isMobile,
  isTablet,
}
