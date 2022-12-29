// 链表
import defaultEqualsFn from './defaultEqualsFn';


export class LinkedNode {
  element;
  next: LinkedNode | undefined
  constructor(element: any, next?: LinkedNode) {
    this.element = element;
    this.next = next;
  }
}

export default class LinkedList {
  count = 0;
  head: LinkedNode | undefined;
  equalsFn = defaultEqualsFn
  constructor(equalsFn = defaultEqualsFn) {
    this.equalsFn = equalsFn
  }

  /**
   * 向链表尾部添加一个新元素
   * @param element 
   */
  push(element: any) {
    const node = new LinkedNode(element);
    if (!this.head) {
      this.head = node
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next
      }
      current.next = node;
    }
    this.count += 1;
  }

  /**
   * 向链表的特定位置插入一个新元素
   * @param element 
   * @param index 
   */
  insert(element: any, index: number) {
    if (index < 0 || index > this.count) return false;
    const node = new LinkedNode(element);
    if (index === 0) {
      node.next = this.head;
      this.head = node;
    } else {
      const previous = this.getElementAt(index - 1);
      const current = previous?.next;
      (previous as LinkedNode).next = node;
      node.next = current;
    }
    this.count += 1;
    return true;
  }

  /**
   * 从链表的特定位置移除一个元素。
   * @param index 
   */
  removeAt(index: number) {
    if (index < 0 || index >= this.count) return undefined;

    let current = this.head;
    if (index === 0) {
      this.head = current?.next;
    } else {
      let previous = this.getElementAt(index - 1);
      let current = this.getElementAt(index);
      (previous as LinkedNode).next = current?.next
    }
    this.count -= 1;
    return current?.element;
  }

  /**
   * 从链表中移除一个元素
   * @param element 
   */
  remove(element: any) {
    return this.removeAt(this.indexOf(element))
  }

  /**
   * 返回链表中特定位置的元素。如果链表中不存在这样的元素， 则返回 undefined
   * @param index 
   */
  getElementAt(index: number) {
    if (index < 0 || index >= this.count) return undefined;

    let current = this.head;
    for (let i = 0; i < index && current; i += 1) {
      current = current?.next;
    }
    return current;
  }

  /**
   * 返回元素在链表中的索引。如果链表中没有该元素则返回-1
   * @param element 
   */
  indexOf(element: any) {
    let current = this.head

    for (let i = 0; i < this.count && current; i += 1) {
      if (this.equalsFn(element, current.element)) {
        return i;
      }
      current = current?.next;
    }

    return -1;
  }

  /**
   * 返回链表包含的元素个数，与数组的 length 属性类似
   */
  size() {
    return this.count;
  }

  /**
   * 如果链表中不包含任何元素，返回 true，如果链表长度大于 0则返回 false
   */
  isEmpty() {
    return !this.size();
  }

  getHead() {
    return this.head;
   } 

  /**
   * 返回表示整个链表的字符串
   * @returns 
   */
  toString() {
    if (!this.head) return '';

    let objString = `${this.head.element}`;
    let current = this.head.next;
    for (let i = 1; i < this.count && current; i += 1) {
      objString = `${objString},${current.element}`;
      current = current.next;
    }
    return objString;
  }
}
