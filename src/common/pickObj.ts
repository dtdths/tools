/**
 * 创建一个从 obj 中选中的属性的对象。
 * @param {*} obj 源obj
 * @param {*} keyList 要提取的key
 * @returns 新obj
 */
const pickObj = (
  obj: Record<string, any> = {},
  keyList: string[] = []
): Record<string, any> =>
  keyList.reduce((pv, cv) => ({ ...pv, [cv]: obj?.[cv] }), {});

export default pickObj;