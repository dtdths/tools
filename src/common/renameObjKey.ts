/**
 * 将对象里的key重命名或删除
 * @param {*} params 对象
 * @param {*} renameObj { '现有key': '重命名key' }
 */
const reNameObjKey = (
  params: Record<string, any> = {},
  renameObj: Record<string, string | null>
): Record<string, any> => {
  if (!renameObj) {
    return params;
  }
  try {
    const _rKeys = Object.keys(renameObj);
    return Object.keys(params).reduce((pv, cv) => {
      let newPv: Record<string, any> = { ...pv };
      if (_rKeys.includes(cv)) {
        const _key = renameObj[cv];
        if (_key) {
          // 存在则重命名，不存在则不填入
          newPv[_key] = params[cv];
        }
      } else {
        newPv[cv] = params[cv];
      }
      return newPv;
    }, {});
  } catch (e) {
    console.log(e);
  }
  return params;
};

export default reNameObjKey;