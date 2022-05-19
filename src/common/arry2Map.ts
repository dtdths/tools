/**
* 将arry转为对象，key为对象的键，item为值
* @param {*} arry
* @param {*} key 主键
* @returns
*/
const arry2Map = (
  arry: Array<Record<string, any>> = [],
  key: string
): Record<string, any> => {
  if (!Array.isArray(arry)) return {};
  return arry.reduce((pv, cv) => {
    return {
      ...pv,
      [cv[key]]: cv,
    };
  }, {});
};

export default arry2Map;