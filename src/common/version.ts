/**
 * @description 转化版本为 version 对象
 * @export
 * @param {string} v
 * @returns {*}  {object}
 */
 export function version(v: string): object {
  const ver = v.split('.')

  return {
    full: v,
    major: parseInt(ver[0], 10),
    minor: parseInt(ver[1], 10),
    patch: parseInt(ver[2], 10),
    build: ver[3] ? parseInt(ver[3], 10) : null,
  }
}

/**
 * @description 版本号比较
 * @export
 * @param {string} v1 版本号 v1，比如10.0.1
 * @param {string} v2 版本号 v2，比如9.0.1
 * @returns {*}  {number} 0: a == b， 1：a > b, -1: a < b
 */
export function versionCompare(v1: string, v2: string): number {
  if (v1 === v2) return 0

  let v1Arr = v1.split('.')
  let v2Arr = v2.split('.')
  // 版本号位数对齐
  const iLen = Math.abs(v1Arr.length - v2Arr.length)
  const fillArr = new Array(iLen).fill('0')
  if (v1Arr.length > v2Arr.length) {
    v2Arr = v2Arr.concat(fillArr)
  } else if (v1Arr.length < v2Arr.length) {
    v1Arr = v1Arr.concat(fillArr)
  }

  for (var i = 0; i < v1Arr.length; i++) {
    let a = parseInt(v1Arr[i], 10)
    let b = parseInt(v2Arr[i], 10)

    if (a > b) {
      return 1
    } else if (a < b) {
      return -1
    } else {
      continue
    }
  }

  return 0
}