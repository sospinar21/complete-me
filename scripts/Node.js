
class Node {
  constructor (data = null) {
    this.data = data;
    this.children = {};
    this.isWord = false;
    this.rating = 0;
  }
}

module.exports = Node;