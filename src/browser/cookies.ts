/*
 * Cookie 相关函数
 */

import { isString } from '../common/type'

interface CookieObj {
  [propName: string]: any
}

/**
 * @description
 * @interface CookieOpts
 *
 */
interface CookieOpts {
  path?: string
  domain?: string
  expires?: Date
  secure?: boolean
}

/**
 * @private
 * @description
 * @param {*} opts
 * @returns {*}
 */
function stingifyOpts(opts: CookieOpts) {
  const allOpts = opts || {}

  let str = ''
  str += allOpts.path ? `;path=${allOpts.path}` : ''
  str += allOpts.domain ? `;domain=${allOpts.domain}` : ''
  str += allOpts.expires ? `;expires=${allOpts.expires.toUTCString()}` : ''
  str += allOpts.secure ? ';secure' : ''
  return str
}

/**
 * @name getCookie
 * @description 获取cookie值
 * @export
 * @param {string} [key] key值
 * @returns {*}  {string}
 */
export function getCookie(key: string): string {
  if (!key) return ''
  const reKey = new RegExp(`(?:^|; )${key}(?:=([^;]*?))?(?:;|$)`)
  const res = reKey.exec(document.cookie)
  return res !== null ? decodeURIComponent(res[1]) : ''
}

/**
 * @name getAllCookies
 * @export
 * @returns {*}  {object}
 */
export function getAllCookies(): object {
  const cookies: CookieObj = {}
  document.cookie.split(/;\s/).forEach((cookie: string) => {
    const tmp = cookie.split('=')
    cookies[tmp[0]] = tmp.length === 2 ? tmp[1] : undefined
  })
  return cookies
}

/**
 * @description
 * @export
 * @param {string} key
 * @param {string} value
 * @param {CookieOpts} opts
 */
export function setCookie(key: string, value: string, opts?: CookieOpts): void {
  if (isString(key) && key && value) {
    if (opts) {
      const allOpts = {
        ...opts,
        secure: opts.secure !== undefined ? opts.secure : false,
      }
      document.cookie = `${key}=${encodeURIComponent(value)}${stingifyOpts(allOpts)}`
    } else {
      document.cookie = `${key}=${encodeURIComponent(value)}`
    }
  }
}

/**
 * @description
 * @export
 * @param {string} key
 */
export function removeCookie(key: string, opts?: CookieOpts): void {
  const allOpts = opts || {}
  allOpts.expires = new Date(0)
  setCookie(key, '', opts)
}

/**
 * @name emptyCookie
 * @description
 * @export
 */
export function emptyCookie() {
  document.cookie.split(/;\s/).forEach((cookie) => removeCookie(cookie.split('=')[0] || cookie))
}

/**
 * @name cookieEnabled
 * @description 判断cookie是否可用
 * @export
 * @returns {*}  {boolean}
 */
export function cookieEnabled(): boolean {
  return window && window.navigator && navigator.cookieEnabled
}
