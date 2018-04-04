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
    this.printFunction(count)
  }

  printFunction(thingToPrint){
    console.log(thingToPrint)
  }
}


  var t = new Trie()
  t.insert('hello')
  t.count()
  t.insert('goodBye')
  t.count()
  t.suggest('he')
  // t.count()
  t.populate()
  t.suggest('piz')

  // console.log(t)
  // t.printFunction('hi')

module.exports = Trie;
