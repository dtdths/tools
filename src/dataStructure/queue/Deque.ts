// 双端队列- 能同时从前端/后端添加/删除元素等特殊队列
class Deque {
  #count = 0;
  #lowestCount = 0;
  #items: Record<number, any> = {};

  /**
   * 向双端队列前端添加元素
   * @param element 
   */
  addFront(element: any) {
    if (this.isEmpty()) {
      this.addBack(element);
    } else if (this.#lowestCount > 0) {
      this.#lowestCount -= 1;
      this.#items[this.#lowestCount] = element;
    } else {
      for (let i = this.#count; i>0; i--) {
        this.#items[i] = this.#items[i - 1];
      }
      this.#count += 1;
      this.#lowestCount = 0;
      this.#items[0] = element;
    }
  }

  /**
   * 向后端添加元素
   * @param element 
   */
  addBack(element: any) {
    this.#items[this.#count] = element;
    this.#count+=1;
  }

  removeFront() {
    if (this.isEmpty()) {
      return undefined;
    }
    const element = this.#items[this.#lowestCount];
    delete this.#items[this.#lowestCount];
    this.#lowestCount += 1;
    return element;
  }

  removeBack() {
    if (this.isEmpty()) {
      return undefined;
    }
    this.#count -= 1;
    const element = this.#items[this.#count];
    delete this.#items[this.#count];
    return element;
  }

  peekFront() {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.#items[this.#lowestCount];
  }

  peekBack() {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.#items[this.#count - 1];
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