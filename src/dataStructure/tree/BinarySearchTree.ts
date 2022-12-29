import { COMPARE, defaultCompare } from "../utils/defaultCompare"


export class Node {
  key
  left: Node | null = null
  right: Node | null = null
  constructor(key: number) {
    this.key = key
  }
}


/**
 * 二叉搜索树, 左节点只能比父节点小，右节点比父节点大
 */
export default class BinarySearchTree {
  root: Node | null = null
  compareFn: (a: number, b: number) => COMPARE
  constructor(compareFn = defaultCompare) {
    this.compareFn = compareFn
  }

  /**
   * 向树中插入一个新的键。
   * @param key 
   */
  insert(key: number) {
    if (this.root) {
      this.insertNode(this.root, key);
    } else {
      this.root = new Node(key);
    }
  }

  insertNode(node: Node, key: number) {
    if (this.compareFn(key, node.key) === COMPARE.LESS_THAN) {
      if (node.left == null) {
        node.left = new Node(key);
      } else {
        this.insertNode(node.left, key);
      }
    } else {
      if (node.right == null) {
        node.right = new Node(key);
      } else {
        this.insertNode(node.right, key);
      }
    }
  }


  /**
   * 在树中查找一个键。如果节点存在，则返回 true；如果不存在，则返回 false。
   * @param key 
   */
  search(key: number) {
    return this.searchNode(this.root, key)
  }
  searchNode(node: Node | null, key: number): boolean {
    if (node === null) {
      return false;
    }
    switch(this.compareFn(key, node.key)) {
      case COMPARE.LESS_THAN:
        return this.searchNode(node.left,key);
      case COMPARE.BIGGER_THAN:
        return this.searchNode(node.right,key);
      default:
        return true
    }

  }

  /**
   * 通过中序遍历方式遍历所有节点（由上到下,中序遍历的一种应用就是对树进行排序操作。）
   */
  inOrderTraverse(callback: Function) {
    this.inOrderTraverseNode(this.root, callback);
  }
  inOrderTraverseNode(node: Node | null, callback: Function) {
    if (node !== null) {
      this.inOrderTraverseNode(node.left, callback)
      callback(node.key);
      this.inOrderTraverseNode(node.right, callback)
    }
  }

  /**
   * 通过先序遍历方式遍历所有节点。先序遍历是以优先于后代节点的顺序访问每个节点的。先序遍历的一种应用是打印一个结构
化的文档。
   */
  preOrderTraverse(callback: Function) {
    this.preOrderTraverseNode(this.root, callback);
  }
  preOrderTraverseNode(node: Node | null, callback: Function) {
    if (node != null) {
      callback(node.key);
      this.preOrderTraverseNode(node.left, callback);
      this.preOrderTraverseNode(node.right, callback);
    }
  }

  /**
   * 通过后序遍历方式遍历所有节点。(是先访问节点的后代节点，再访问节点本身, 后序遍历的一种应用是计算一个目录及其子目录中所有文件所占空间的大小。)
   */
  postOrderTraverse(callback: Function) {
    this.postOrderTraverseeNode(this.root, callback);
  }
  postOrderTraverseeNode(node: Node | null, callback: Function) {
    if (node != null) {
      this.postOrderTraverseeNode(node.left, callback);
      this.postOrderTraverseeNode(node.right, callback);
      callback(node.key);
    }
  }

  /**
   * 返回树中最小的值/键
   */
  min() {
    return this.minNode(this.root);
  }
  minNode(node: Node | null) {
    let current = node;
    while (current !== null && current.left !== null) {
      current = current.left
    }
    return current;
  }

  /**
   * 返回树中最大的值/键
   */
  max() {
    return this.maxNode(this.root);
  }
  maxNode(node: Node | null) {
    let current = node;
    while (current !== null && current.right !== null) {
      current = current.right
    }
    return current;
  }

  /**
   * 从树中移除某个键
   * @param key 
   */
  remove(key: number) {
    console.log(key)
    this.root = this.removeNode(this.root, key);
  }
  removeNode(node: Node|null, key: number): Node | null{
    if (node === null) {
      return null;
    }
    if (this.compareFn(key, node.key) === COMPARE.LESS_THAN) {
      node.left = this.removeNode(node.left, key);
      return node;
    } else if (this.compareFn(key, node.key) === COMPARE.BIGGER_THAN) {
      node.right = this.removeNode(node.right, key);
      return node;
    } else {
      if (node.left === null && node.right === null) {
        node = null;
        return node;
      } else if (node.left === null) {
        node = node.right;
        return node;
      } else if (node.right === null) {
        node = node.left;
        return node;
      }
      const aux = this.minNode(node.right);
      node.key = aux?.key as number;
      node.right = this.removeNode(node.right, aux?.key as number);

      return node;

    }
  }

}

// test
(() => {
  const tree = new BinarySearchTree();
  tree.insert(7);
  tree.insert(15);
  tree.insert(5);
  tree.insert(3);
  tree.insert(9);
  tree.insert(8);
  tree.insert(10);
  tree.insert(13);
  tree.insert(12);
  tree.insert(14);
  tree.insert(20);
  tree.insert(18);
  tree.insert(25);

  tree.insert(6);

  tree.inOrderTraverse((key: any) => {
    console.log(key)
  })
})()
