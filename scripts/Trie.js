const Node = require('../scripts/Node');
var fs = require('fs');

class Trie {
  constructor() {
    this.root = new Node();
    this.wordCount = 0;
  }

  insert(data){
    const letters = [...data];
    let currentNode = this.root;
    letters.forEach(letter => {
      if(!currentNode.children[letter]){
        currentNode.children[letter] = new Node(letter)
      } 
      currentNode = currentNode.children[letter];
    })
    
    if(!currentNode.isWord){
      this.wordCount++
      currentNode.isWord = true;
    }
  }

  suggest(str){
    let letters = [...str]
    const suggestions = []
    let currentNode = this.root;
    if(!currentNode.children[letters[0]]){
      return suggestions
    }

    letters.forEach(letter => {
      if(currentNode.children){
        if(currentNode.children[letter]){
          currentNode = currentNode.children[letter]
        }
      }  
    })

    let findWord = (str, currentNode) => {
      if(currentNode.isWord){
        suggestions.push(str)
      }
      if(currentNode.children){
        let childKeys = Object.keys(currentNode.children)
        childKeys.forEach(child => {
          let childNode = currentNode.children[child];
          let newString = str + child;
          findWord(newString,childNode)
        })
      }
    }

    findWord(str,currentNode)
    this.printFunction(suggestions)
    return suggestions;
  }

  select(word){
    let newArr = [...word]
    newArr.forEach(letter => {
      // iterate each node and find the end of the word 
      //  add a counter to the node
      //  find the counter of the last node
      //  create an object with the word and the counter
      //  push that object to the array and sort the array by counter number
      //  push sorted array to the suggestions array 
      //  
    })

  }
  
  populate(){
    const text = "/usr/share/dict/words"
    const dictionary = fs.readFileSync(text).toString().trim().split('\n')
    dictionary.forEach(word => {
      this.insert(word)
    })
    this.count()
  }

  count(){
    let count = this.wordCount
    return count;
  }

  printFunction(thingToPrint){
    console.log('testinggg',thingToPrint)
  }

  delete(str) {
    let currentNode = [...str]
    if (currentNode && currentNode.isWord) {
        currentNode.isWord = false;
        this.wordCount--;
    }
  }
}


  var t = new Trie()
  t.insert('hello')
  t.count()
  t.insert('goodBye')
  t.count()
  t.suggest('he')
  t.populate()
  t.suggest('piz')

module.exports = Trie;
