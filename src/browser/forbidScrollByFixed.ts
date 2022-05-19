let scrollTop = 0

/**
 * 禁止页面滚动 body fixed方案  .frozen{position: fixed; width: 100%;}
 * @param flag 是否禁止滚动
 * @returns 
 */
const forbidScrollByFixed = (flag: Boolean, fixedClassName: string = 'frozen'): void => {
  if (flag) {
    scrollTop = document.documentElement.scrollTop
    // 使body脱离文档流
    document.body.classList.add(fixedClassName)
    // 把脱离文档流的body拉上去！否则页面会回到顶部！
    document.body.style.top = `${-scrollTop}px`
  } else {
    document.body.style.top = ''
    document.body.classList.remove(fixedClassName)

    document.documentElement.scrollTop = scrollTop
  }
}

export default forbidScrollByFixed;