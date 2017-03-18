import * as babylon from 'babylon';
import traverse from 'babel-traverse';
import generate from 'babel-generator';
import {assert} from 'chai';
import {mainVisitor} from '../../src/visitors/mainVisitor';

function transform(code) {
  const ast = babylon.parse(code);

  traverse(ast, mainVisitor);

  return generate(ast).code;
}

function assertOutput(code, expected) {
  const out = transform(code);

  assert.equal(out, expected);
}

describe('Collide with _ defined in global scope #1', () => {

  it('should use _ from global scope', () => {
    const code = `
      var _;
      f(_ * 10)
    `;

    const expected = `
var _;
f(_2 => {
  return _2 * 10;
});`;

    assertOutput(code, expected);
  });

});
