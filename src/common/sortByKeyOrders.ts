/**
 * 按照已有的顺序对数组排序
 * @param list 
 * @param orderList 已有的key的顺序
 * @param sortKey 根据key排序
 * @returns 
 */
 const sortByKeyOrders = (list: Array<any>, orderList: Array<string | number>, sortKey?: string) => {
  const obj = orderList.reduce(
    (pv, cv, index) => {
      return {
        ...pv,
        [cv]: index - orderList.length,
      };
    },
    list.reduce((pv, cv, index) => {
      return {
        ...pv,
        [sortKey ? cv[sortKey] : cv]: index,
      };
    }, {}),
  );
  return [...list].sort((a, b) => {
    const _key = (item: any) => sortKey ? item[sortKey] : item;
    return obj[_key(a)] - obj[_key(b)];
  });
};

export default sortByKeyOrders;