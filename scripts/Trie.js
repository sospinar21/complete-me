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
    let letters = [...str];
    const suggestions = [];
    let currentNode = this.root;



    for(let i =0; i < letters.length; i++) {
        if(currentNode.children[letters[i]]){
          currentNode = currentNode.children[letters[i]]
        } else {
          return []
        }
    }

    let findWord = (str, currentNode) => {
      if(currentNode.isWord){
        let suggestion = {
          word: str,
          rating: currentNode.rating
        }
        suggestions.push(suggestion)
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

    const sortedSuggestions = suggestions.sort((b, a) => a.rating - b.rating).map(wordObject => wordObject.word)
    return sortedSuggestions;
  }

  select(word){
    let currentNode = this.root;
    let newArr = [...word]
    for(let i =0; i < newArr.length; i++) {
        if(currentNode.children[newArr[i]]){
          currentNode = currentNode.children[newArr[i]]
        } else {
          return []
        }
    }
    currentNode.rating++
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
