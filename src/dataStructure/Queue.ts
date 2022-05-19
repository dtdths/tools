// 队列-先入先出（FIFO）
export default class Queue {
  #count = 0;
  #lowestCount = 0;
  #items: Record<number, any> = {};

  /**
   * 向队列添加元素
   * @param element 
   */
  enqueue(element: any){
    this.#items[this.#count] = element;
    this.#count+=1;
  }

  /**
   * 从队列前移除元素
   */
  dequeue(){
    if (this.isEmpty()) {
      return undefined;
    }
    const element = this.#items[this.#lowestCount];
    delete this.#items[this.#lowestCount];
    this.#lowestCount += 1;
    return element;
  }

  /**
   * 查看队列头元素
   * @returns 
   */
  peek() {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.#items[this.#lowestCount];
  }
  
  /**
   * 是否为空
   * @returns 
   */
  isEmpty() {
    return !this.size();
  }

  /**
   * 返回长度
   * @returns 
   */
  size() {
    return this.#count - this.#lowestCount;
  }

  /**
   * 清空
   */
  clear() {
    this.#count = 0;
    this.#lowestCount = 0;
    this.#items = {};
  }

  toString(){
    if(this.isEmpty()) {
      return ''
    }
    let objectString = `${this.#items[this.#lowestCount]}`;
    for(let i = this.#lowestCount + 1; i< this.#count; i++){
      objectString = `${objectString},${this.#items[i]}`;
    }
    return objectString;
  }
}
