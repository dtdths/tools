// 栈——先入后出（LIFO）
export default class Stack {
  // 长度
  #count: number = 0;
  // 内容
  #items: Record<number, any> = {};

  /**
   * 向栈中插入的元素
   * @param element 
   */
  push(element: any): void {
    this.#items[this.#count] = element;
    this.#count += 1;
  }

  /**
   * 返回长度
   * @returns 
   */
  size(): number {
    return this.#count
  }

  /**
   * 是否为空
   * @returns 
   */
  isEmpty():boolean {
    return !this.#count
  }

  /**
   * 弹出栈顶元素
   * @returns 
   */
  pop() {
    if (this.isEmpty()) {
      return undefined;
    }
    this.#count -= 1;
    const element = this.#items[this.#count];
    delete this.#items[this.#count];
    return element
  }
  
  /**
   * 查看栈顶元素
   * @returns 
   */
  peek() {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.#items[this.#count - 1];
  }

  /**
   * 清空
   */
  clear() {
    this.#count = 0;
    this.#items = {};
  }

  /**
   * 输出 , 分割的字符串
   * @returns 
   */
  toString() {
    if (this.isEmpty()) {
      return '';
    }
    let objectString = `${this.#items[0]}`;
    for(let i = 1; i < this.#count; i++) {
      objectString = `${objectString},${this.#items[i]}`;
    }
    return objectString;
  }
}
