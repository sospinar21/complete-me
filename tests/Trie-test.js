import { expect } from 'chai';
const Trie = require('../scripts/Trie');
const Node = require('../scripts/Node');
import fs from 'fs';
const text = "/usr/share/dict/words"
const dictionary = fs.readFileSync(text).toString().trim().split('\n')



describe('TRIE', () => {
  let trie;

  beforeEach(() => {
    trie = new Trie()
  })

  it('expect to exist', () => {
    expect(trie).to.exist;
  });

  it('expect to have a root node that defaults to null', () => {
    let node = new Node();
    expect(trie.root).to.deep.equal(null);
  });

  it('expect to have a wordCount property defaulted to zero', () => {
    expect(trie.wordCount).to.equal(0);
  });
  
  describe('insert', () => {

  it('should be able to insert a word', () => {
    trie.insert('hello');
    console.log(JSON.stringify(trie, null, 2))
    expect(trie.root).to.be.instanceOf(Node)
    })

  it('should increase the wordCount with each word passed in', () => {
    trie.insert('a');
    expect(trie.root.children.a).to.exist;
    expect(trie.wordCount).to.equal(1);
    });

   it('should be able to insert a word and root should have children', () => {
      trie.insert('hola');
      expect(trie.root.children.h.data).to.equal('h')
      expect(trie.root.children.h.children.o.data).to.equal('o')
    })

   it('should set the last letter of the array', () => {
      trie.insert('hola');
      let currNode = trie.root.children.h.children.o.children.l.children.a.data;
      expect(currNode).to.equal('a')
    })

    it('expect to increase count property when a new word is inserted', () => {
      trie.insert('increase');
      expect(trie.wordCount).to.equal(1);
      trie.insert('decrease');
      expect(trie.wordCount).to.equal(2);
    });
  
    it('should no update the count property when a repeat word is inserted', () => {
      trie.insert('whattt');
      expect(trie.wordCount).to.equal(1);
      trie.insert('whattt');
      expect(trie.wordCount).to.equal(1);
    });

 })

})