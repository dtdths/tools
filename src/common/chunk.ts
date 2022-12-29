/**
 * 将数组 list 分成每份 size 长的数组
 * @param list 
 * @param size 
 * @returns 
 */
const chunk = (list: Array<any>, size: number) => {
  const r = [];
  for (let i = 0; i < Math.ceil(list.length / size); i++) {
    r.push(list.slice(i * size, (i + 1) * size))
  }
  return r
}


export default chunk;