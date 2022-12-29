// TODO 双向链表 (// TODO 有序、循环、stack)
import defaultEqualsFn from './defaultEqualsFn';
import LinkedList, { LinkedNode } from './LinkedList'

export class DoublyLinkedNode extends LinkedNode {
  prev: DoublyLinkedNode | undefined
  constructor(element: any, next?: DoublyLinkedNode, prev?: DoublyLinkedNode) {
    super(element, next)
    this.prev = prev;
  }
}

export default class DoublyLinked extends LinkedList {

  head: DoublyLinkedNode | undefined
  // 尾部
  tail: DoublyLinkedNode | undefined
  constructor(equalsFn = defaultEqualsFn){
    super(equalsFn)
  }

  /**
  * 向链表的特定位置插入一个新元素
  * @param element 
  * @param index 
  */
  insert(element: any, index: number) {
    const node = new DoublyLinkedNode(element);

    if (index <0 || index > this.count) return false;
    if (index === 0) {
      if (this.head) {
        node.next = this.head;
        this.head.prev = node;
        this.head = node;
      } else {
        this.head = node;
        this.tail = node;
      }
    } else if (index = this.count) {
      (this.tail as DoublyLinkedNode).next = node;
      node.prev = this.tail;
      this.tail = node;
    } else {
      const prev = this.getElementAt(index - 1) as DoublyLinkedNode;
      node.next = prev.next;
      node.prev = prev;
      (node.next as DoublyLinkedNode).prev = node;
      prev.next = node;
    }
    this.count += 1
    return true
  }
}