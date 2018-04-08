import { expect } from 'chai';
const Node = require('../scripts/Node')

describe('NODE', () => {
  let node;

  beforeEach(() => {
    node = new Node('a')
  })

  it('expect a Node object', () => {
    expect(node).to.exist
  });

  it('expect to take data', () => {
    expect(node.data).to.equal('a')
  });

  it('expect to have a property of children default to empty object', () => {
    expect(node.children).to.deep.equal({});
  });

  it('expect to have a property of isWord dafault to false', () => {
    expect(node.isWord).to.equal(false);
  })

  it('expect to have a property of rating that defaults to zero', () => {
    expect(node.rating).to.equal(0);
  })

})