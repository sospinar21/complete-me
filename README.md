# complete-me

Complete Me
Everybody uses auto complete. In this project you are going to be building a low level version of an auto complete system in javascript.
The first thing your trie should be able to do is take in a word. It should also keep a count of how many words have been inserted.

import Trie from "./lib/Trie"

var completion = new Trie()

completion.insert("pizza")

completion.count()
=> 1

completion.insert('apple')

completion.count()
=> 2
Phase 2
Once the words are placed into the trie it should be able to offer some suggestions based on a word prefix.

completion.suggest("piz")
=> ["pizza"]

completion.insert("pizzeria")

completion.suggest("piz")
=> ["pizza", "pizzeria"]

completion.suggest('a')
=> ["apple"]
Phase 3
Our Trie won’t be very useful without a good dataset to populate it. Our computers ship with a special file containing a list of standard dictionary words. It lives at /usr/share/dict/words

Using the unix utility wc (word count), we can see that the file contains 235886 words:

$ cat /usr/share/dict/words | wc -l
=> 235886
We are going to load that data set into our trie.

import fs from 'fs';

const text = "/usr/share/dict/words"
const dictionary = fs.readFileSync(text).toString().trim().split('\n')

const completion = new Trie()

completion.populate(dictionary)

completion.count()
=> 235886

completion.suggest("piz")
=> ["pize", "pizza", "pizzeria", "pizzicato", "pizzle"]
Phase 4
Next week you will create a Weather App that needs an autocomplete feature. Package your complete-me trie in a node module so that you can import it into future projects. (Note: don’t publish to npm, you can install your package from github)

Extensions
Front Facing Application
See if you can implement a front facing application for your trie. The user should be able to submit a word and then receive the suggestions on the dom.

Delete method
Sometimes auto-completes give suggestions which we never want to see. Add a delete method to your Trie.

completion.suggest("piz")
=> ["pizzeria", "pize", "pizza", "pizzicato", "pizzle", ...]

completion.delete("pizzle");

completion.suggest("piz")
=> ["pizzeria", "pize", "pizza", "pizzicato", ...]
