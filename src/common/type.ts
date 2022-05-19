/*
 * 对象类型相关判断
 */

/**
 * @private
 * @description 获取指定对象的类型
 * @param {*} obj
 * @returns {*}  {string} 对象类型值
 */
 function getType(obj: any): string {
  if (obj == null) {
    return obj === undefined ? '[object Undefined]' : '[object Null]'
  }
  return Object.prototype.toString.call(obj)
}

/**
 * @description 判断是否是function
 * @export
 * @param {*} obj 需要判断类型的变量
 * @returns {*}  {boolean}
 */
export function isFunction(obj: any): boolean {
  return typeof obj === 'function'
}

/**
 * @description 判断是否是Object
 * @export
 * @param {*} obj 需要判断类型的变量
 * @returns {*}  {boolean}
 */
export function isObject(obj: any): boolean {
  return getType(obj) === '[object Object]'
}

/**
 * @description 判断是否是array
 * @export
 * @param {*} obj 需要判断类型的变量
 * @returns {*}  {boolean}
 */
export function isArray(obj: any): boolean {
  return getType(obj) === '[object Array]'
}

/**
 * @description 判断是否是undefined
 * @export
 * @param {*} obj 需要判断类型的变量
 * @returns {*}  {boolean}
 */
export function isUndefined(obj: any): boolean {
  return getType(obj) === '[object Undefined]'
}

/**
 * @description 判断是否是null
 * @export
 * @param {*} obj 需要判断类型的变量
 * @returns {*}  {boolean}
 */
export function isNull(obj: any): boolean {
  return getType(obj) === '[object Null]'
}

/**
 * @description 判断是否是字符串
 * @export
 * @param {*} obj 需要判断类型的变量
 * @returns {*}  {boolean}
 */
export function isString(obj: any): boolean {
  return typeof obj === 'string'
}

/**
 * @description 判断是否是布尔类型
 * @export
 * @param {*} obj 需要判断类型的变量
 * @returns {*}  {boolean} 是否为boolean类型
 */
export function isBoolean(obj: any): boolean {
  return typeof obj === 'boolean'
}

/**
 * @description 判断是否是一个数字
 * @export
 * @param {*} num 需要判断类型的变量
 * @returns {*}  {boolean}
 */
export function isNumber(num: any): boolean {
  return getType(num) === '[object Number]'
}

/**
 * @description Checks if `value` is classified as a `Symbol` primitive or object.
 * @param {*} value The value to check.
 * @returns {*}  {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * isSymbol(Symbol.iterator)
 * // => true
 *
 * isSymbol('abc')
 * // => false
 */
export function isSymbol(value: any): boolean {
  const type = typeof value
  return type === 'symbol' || (type === 'object' && value != null && getType(value) === '[object Symbol]')
}