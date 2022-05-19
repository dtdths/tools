/**
 * formatTime 时间格式化
 * @param date  Date | Number | string
 * @param format yyyy-MM-dd hh:mm:ss
 * @returns 
 */
const formatTime = (date: Date | Number | string, format: string = 'yyyy-MM-dd hh:mm:ss') => {
  let _date = date;
  if (typeof date === 'string' || typeof date === 'number') {
    _date = new Date(Number(date));
  }
  if (Object.prototype.toString.call(_date) !== '[object Date]') {
    throw Error('时间格式错误' + _date);
  }
  _date = _date as Date;
  const o: Record<string, any> = {
    'M+': _date.getMonth() + 1, //month
    'd+': _date.getDate(), //day
    'h+': _date.getHours(), //hour
    'm+': _date.getMinutes(), //minute
    's+': _date.getSeconds(), //second
    'q+': Math.floor((_date.getMonth() + 3) / 3), //quarter
    'N+': _date.getHours() < 12 ? 'am' : 'pm', //ampm
    'S': _date.getMilliseconds(), //millisecond
  };
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (_date.getFullYear() + '').substring(4 - RegExp.$1.length));
  }
  for (const k in o) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substring(('' + o[k]).length),
      );
    }
  }
  return format;
};

export default formatTime;