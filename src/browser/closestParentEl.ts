/**
 * 最接近el的祖先selector
 * @param el 当前元素
 * @param selector 祖先选择器
 * @returns 
 */
const closestParentEl = (el: HTMLElement, selector: string) => {
  let _el: HTMLElement | null = el;
  while (_el) {
    if (_el.matches(selector)) {
      return _el;
    }
    _el = _el.parentElement;
  }
  return null;
};

export default closestParentEl;