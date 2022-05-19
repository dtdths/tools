/*
 * url相关函数
 */

import { isArray } from '../common/type'

/**
 * @description url对象参数
 * @interface UrlParamObj
 */
interface UrlParamObj {
  [propName: string]: any
}

/**
 * @private
 * @function
 * @description 切割字符串
 * @param {string} string 字符串
 * @param {string} separator 切割符号
 * @returns {*}  {Array<string>}
 */
function splitOnFirst(string: string, separator: string): Array<string> {
  if (!(typeof string === 'string' && typeof separator === 'string')) {
    throw new TypeError('Expected the arguments to be of type `string`')
  }

  if (separator === '') {
    return [string]
  }

  const separatorIndex = string.indexOf(separator)

  if (separatorIndex === -1) {
    return [string]
  }

  return [string.slice(0, separatorIndex), string.slice(separatorIndex + separator.length)]
}

/**
 * @private
 * @function
 * @description
 * @param {string} str
 * @returns {*}  {object}
 */
function getQueryParameters(str?: string): object {
  const myStr = (str || window.location.search).replace(/(^\?)/, '')

  // 如果str不是字符串或为空 返回空对象
  if (typeof myStr !== 'string' || !myStr) return {}

  const result: UrlParamObj = {}
  const strArr: Array<string> = myStr.split('&')

  strArr.map((kv: string) => {
    const tmp = splitOnFirst(kv, '=')
    result[tmp[0]] = tmp[1]
    return kv
  })

  return result
}

/**
 * @function
 * @name removeProtocol
 * @description 移除url中的协议部分
 * @param {string} url - 带协议的url
 * @returns {string} - 无http头的url
 */
export function removeProtocol(url: string): string {
  if (url.match(/^http:|^https:/i) !== null) {
    return url.replace(/^http:|^https:/i, '')
  }
  return url
}

/**
 * @function
 * @name concatQueryString
 * @description url添加参数
 * @param {String} url - 原始url
 * @param {String} queryString - 参数集
 * @returns {string} - 拼接后的url
 */
export function concatQueryString(url: string, queryString: string): string {
  return url + (/\?/.test(url) ? '&' : '?') + queryString
}

/**
 * @function
 * @name serialize
 * @description 序列化对象
 * @param  {object} data 需要序列化的对象
 * @returns {string} 序列化之后的字符串
 */
export function serialize(data: UrlParamObj): string {
  return Object.keys(data)
    .map((key: string) => `${key}=${data[key]}`)
    .join('&')
}

/**
 * @function
 * @description 获取 URL 参数
 * @export
 * @param {(string | Array<string>)} name 希望获取的参数名称
 * @param {string} [url] url 地址，默认取当前浏览器地址参数
 * @returns {*}  {(string | object)}
 */
export function getUrlQuery(name: string | Array<string>, url?: string): string | object {
  const obj: UrlParamObj = getQueryParameters(url)

  if (!name) return obj

  if (isArray(name)) {
    const result: UrlParamObj = {}
    for (let i = 0; i < name.length; i += 1) {
      result[name[i]] = obj[name[i]] || null
    }
    return result
  }
  return obj[<string>name]
}
