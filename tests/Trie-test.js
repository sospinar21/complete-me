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

  it('expect to have a root node that begins as null', () => {
    let node = new Node();
    expect(trie.root).to.deep.equal(node);
  });

  it('expect to have a wordCount property defaulted to zero', () => {
    expect(trie.wordCount).to.equal(0);
  });
  
describe('insert', () => {

  it('should be able to insert a word', () => {
    trie.insert('hello');
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
    trie.insert('saludes');
    expect(trie.wordCount).to.equal(1);
    trie.insert('saludes');
    expect(trie.wordCount).to.equal(1);
  });
 })

describe('suggest', () => {

  beforeEach(() => {
    trie = new Trie()
  })

  it('should be a function', () => {
    expect(trie.suggest).to.exist
  })

  it('it should suggest pizza when given piz', () => {
    trie.insert('carts');
    trie.insert('cartel');
    let suggested = trie.suggest('cart')
    expect(suggested).to.deep.equal(['carts', 'cartel'])
  })

  it('should return all children', () => {
    trie.insert('pizza')
    let suggested = trie.suggest('coff')
    expect(suggested).to.deep.equal([])
  })

  it('should sort suggestions by rating', () => {
    trie.insert('burger');
    trie.insert('burrito');
    trie.insert('butt');
    trie.select('burrito');
    trie.select('burrito');

    let suggested = trie.suggest('bu')
    expect(suggested).to.deep.equal(['burrito', 'burger', 'butt'])
  })


 })

describe('populate', () => {

  beforeEach(() => {
    trie = new Trie();
  })

  it('should be a function', () => {
    expect(trie.populate).to.exist
    // console.log(JSON.stringify(trie, null, 2))
  })

  it('should have lots of words after dictionary is populated', () => {
      trie.populate()
      trie.count()
      expect(trie.wordCount).to.equal(235886);
    })
})

describe('count', () => {
  
  beforeEach(() => {
    trie = new Trie();
  })

  it('should be a function', () => {
    expect(trie.count).to.exist
  })

   it('keep track of inserted words', () => {
      trie.populate()
      trie.insert('denver')
      expect(trie.wordCount).to.equal(235887);
    })
})


describe('select', () => {

   beforeEach(() => {
    trie = new Trie();
  })

    it('should be a function', () => {
    expect(trie.select).to.exist
    })

    it('should increase the nodes rating by one when selected ', () => {
      trie.insert('fries')
      trie.select('fries')

      expect(trie.root.children.f.children.r.children.i.children.e.children.s.rating).to.equal(1)
    })

    it('should increase the nodes rating by one for each time it\'s selected', () => {
      trie.insert('water')
      trie.select('water')
      trie.select('water')
      trie.select('water')

      expect(trie.root.children.w.children.a.children.t.children.e.children.r.rating).to.equal(3)
    })

})

}) 
