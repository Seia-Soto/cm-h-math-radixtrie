const fs = require('fs')
const path = require('path')
const RadixTrie = require('./index')

const sampleText = path.join(__dirname, 'sample.txt')
const text = fs
  .readFileSync(sampleText)
  .toString()
const sentences = text
  .split('\n')
  .filter(item => !!item)

console.log('Number of sentences:', sentences.length)

const trie = new RadixTrie()

console.time('Text-to-Trie registration')

for (let i = 0, l = sentences.length; i < l; i++) {
  const sentence = sentences[i]

  trie.register(sentence)
}

console.timeEnd('Text-to-Trie registration')

console.time('In-trie search')

for (let i = 0, l = sentences.length; i < l; i++) {
  const sentence = sentences[i]

  trie.search(sentence)
}

console.timeEnd('In-trie search')

console.time('In-trie sort')

trie.sort()

console.timeEnd('In-trie sort')

console.time('In-trie normal O(n) sort')

sentences.sort(trie.sortFn)

console.timeEnd('In-trie normal O(n) sort')
