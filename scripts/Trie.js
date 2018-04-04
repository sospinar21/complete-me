const Node = require('../scripts/Node');

class Trie {
  constructor() {
    this.root = null;
    this.wordCount = 0;
  }

  insert(data){
    if(this.root === null){
      this.root = new Node();
    }

    const letters = [...data];
    let currentNode = this.root;
    letters.forEach(letter => {
      if(currentNode.children[letter] == null){
        currentNode.children[letter] = new Node(letter)
      } 
      currentNode = currentNode.children[letter];
    })
    if(!currentNode.isWord){
      this.wordCount++
      currentNode.value = data
      currentNode.isWord = true;
      this.lastLetter(currentNode)
    }
  }

  lastLetter(currNode){
    let lastLetter = currNode.data; 
    return lastLetter;
  }

  suggest(str){
    let letter = [...str]
    const suggestions = []
    let currentNode = this.root;  
  }


}

module.exports = Trie;