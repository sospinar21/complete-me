// import Trie from './Trie';
const Trie = require('./scripts/Trie');
const words = require('./scripts/words.json');

const trie = new Trie();

const list = document.querySelector('.title')

list.addEventListener('click', () => console.log('hi'))