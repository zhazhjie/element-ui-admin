/**
 * @author: zzj
 * @date: 2019-08-14 16:05:26
 * @version: 1.0
 * 二叉搜索树，实现了增删查
 * 查包括：单项、最大/最小值、最接近值、大于/小于指定key的集合、指定key的中序集合
 * 下划线_开头的方法为私有方法
 */

class Node {
  constructor(key, value = key) {
    this.key = key;
    this.value = value;
    this.left = null;
    this.right = null;
    this.parent = null;
  }
}

export class BinarySearchTree {
  constructor(args, key = "id") {
    this.root = null;
    this.size = 0;
    this.key = key;
    this._init(args, key);
  }

  /**
   * 插入节点
   * @param key
   * @param value
   */
  insert(key, value) {
    let newNode = new Node(key, value);
    if (!this.root) {
      this.root = newNode;
    } else {
      this._insertNode(this.root, newNode);
    }
    this.size++;
  }

  /**
   * 获取key对应的值
   * @param key
   * @returns {*|*|*}
   */
  get(key) {
    let node = this._findNode(key);
    return node && node.value;
  }

  /**
   * 获取最小值
   * @returns {*|*|*}
   */
  getMin() {
    let minNode = this._searchSide(this.root, "left");
    return minNode && minNode.value;
  }

  /**
   * 获取最大值
   * @returns {*|*|*}
   */
  getMax() {
    let maxNode = this._searchSide(this.root, "right");
    return maxNode && maxNode.value;
  }

  /**
   * 寻找最接近且小于等于指定key的节点
   * @param key
   * @returns {*|*|*|*}
   */
  getFloor(key) {
    let closestNode = this._findClosestNode(this.root, key, null,
      (node, key, targetNode) => key > node.key && (!targetNode || node.key > targetNode.key)
    );
    return closestNode && closestNode.value;
  }

  /**
   * 寻找最接近且大于等于指定key的节点
   * @param key
   * @returns {*|*|*|*}
   */
  getCeiling(key) {
    let closestNode = this._findClosestNode(this.root, key, null,
      (node, key, targetNode) => key < node.key && (!targetNode || node.key < targetNode.key)
    );
    return closestNode && closestNode.value;
  }

  /**
   * 寻找最接近指定key的节点
   * @param key
   * @returns {*|*|*|*}
   */
  getClosest(key) {
    let closestNode = this._findClosestNode(this.root, key, null,
      (node, key, targetNode) => !targetNode || Math.abs(node.key - key) < Math.abs(targetNode.key - key)
    );
    return closestNode && closestNode.value;
  }

  /**
   * 获取小于指定key的集合
   * @param key
   * @returns {Array}
   */
  getLesser(key) {
    let result = [];
    this._findLesser(this.root, key, result);
    return result;
  }

  /**
   * 获取大于指定key的集合
   * @param key
   * @returns {Array}
   */
  getGreater(key) {
    let result = [];
    this._findGreater(this.root, key, result);
    return result;
  }

  /**
   * 获取指定key节点下的中序集合
   * @param key
   * @returns {Array}
   */
  inOrderTraversal(key) {
    let result = [];
    let node = this._findNode(this.root, key);
    this._searchNode(node, value => {
      result.push(value);
    });
    return result;
  }

  /**
   * 删除节点
   * @param key
   * @returns {*}
   */
  remove(key) {
    let node = this._findNode(this.root, key);
    if (node) {
      this._removeNode(node);
      this.size--;
      return node.value;
    } else {
      return null;
    }
  }

  /**
   * 二叉树长度
   * @returns {number}
   */
  length() {
    return this.size;
  }

  /**
   * 是否包含某个值，返回boolean
   * @param key
   * @returns {boolean}
   */
  contains(key) {
    return this._findNode(this.root, key) != null;
  }

  /**
   * 迭代器
   * @param callback
   */
  forEach(callback) {
    this._searchNode(this.root, callback);
  }

  /**
   * 转成数组
   * @returns {Array}
   */
  toArray() {
    let array = [];
    this._searchNode(this.root, value => {
      array.push(value);
    });
    return array;
  }

  _insertNode(node, newNode) {
    if (newNode.key < node.key) {
      if (!node.left) {
        node.left = newNode;
        newNode.parent = node;
      } else {
        this._insertNode(node.left, newNode);
      }
    } else {
      if (!node.right) {
        node.right = newNode;
        newNode.parent = node;
      } else {
        this._insertNode(node.right, newNode);
      }
    }
  }

  _searchSide(node, side) {
    if (!node) return null;
    if (node[side]) {
      return this._searchSide(node[side]);
    } else {
      return node;
    }
  }

  _findNode(node, key) {
    if (!node) return null;
    if (key === node.key) {
      return node;
    } else if (key >= node.key) {
      return this._findNode(node.right, key);
    } else {
      return this._findNode(node.left, key);
    }
  }

  _searchNode(node, callback) {
    if (node) {
      this._searchNode(node.left, callback);
      callback(node.value);
      this._searchNode(node.right, callback);
    }
  }

  _findClosestNode(node, key, targetNode, condition) {
    if (!node) return targetNode;
    if (condition(node, key, targetNode)) targetNode = node;
    if (key === node.key) {
      return node;
    } else if (key > node.key) {
      return this._findClosestNode(node.right, key, targetNode, condition);
    } else {
      return this._findClosestNode(node.left, key, targetNode, condition);
    }
  }

  _findLesser(node, key, result) {
    if (!node) return;
    if (key > node.key) {
      result.push(node.value);
      this._findLesser(node.right, key, result);
    }
    this._findLesser(node.left, key, result);
  }

  _findGreater(node, key, result) {
    if (!node) return;
    if (key < node.key) {
      result.push(node.value);
      this._findGreater(node.left, key, result);
    }
    this._findGreater(node.right, key, result);
  }

  _removeNode(node) {
    if (node) {
      let parent = node.parent;
      if (!node.left && !node.right) {
        this._linkParent(parent, node, null);
      } else if (node.left && node.right) {
        let minNode = this._searchSide(node.right, "left");
        this._removeNode(minNode);
        this._linkParent(parent, node, minNode);
        minNode.parent = parent;
        minNode.left = node.left;
        minNode.right = node.right;
      } else {
        let child = node.right || node.left;
        this._linkParent(parent, node, child);
        child.parent = parent;
      }
      node.left = null;
      node.right = null;
      node.parent = null;
      return node;
    }
  }

  _linkParent(parent, node, newNode) {
    if (parent) {
      if (parent.left === node) {
        parent.left = newNode;
      } else if (parent.right === node) {
        parent.right = newNode;
      }
    }
  }

  _init(args) {
    if (Object.prototype.toString.call(args) === "[object Array]") {
      this._binarySearch(args);
      this.size = args.length;
    }
  }

  _binarySearch(list) {
    let len = list.length;
    let mid = len >> 1;
    let item = list[mid];
    let left = list.slice(0, mid);
    let right = list.slice(mid + 1, len);
    this._setNode(item);
    if (left.length) this._binarySearch(left);
    if (right.length) this._binarySearch(right);
  }

  _setNode(item) {
    if (Object.prototype.toString.call(item) === "[object Object]") {
      this.insert(item[this.key], item);
    } else {
      this.insert(item);
    }
  }
}
