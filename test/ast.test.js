import * as babylon from 'babylon';
import traverse from 'babel-traverse';
import generate from 'babel-generator';
import { mainVisitor } from '../src/visitors/mainVisitor';
import { assert } from 'chai';

function transform(code) {
  const ast = babylon.parse(code);

  traverse(ast, mainVisitor);

  return generate(ast).code;
}

function assertOutput(code, expected) {
  const out = transform(code);

  assert.equal(out, expected);
}

describe("AST transformations", () => {

  describe("Binary expressions", () => {

    it("should replace left side", () => {
      const code = '[1, 2].map(_ * 10)';

      const expected = `[1, 2].map(_2 => {
  return _2 * 10;
});`;

      assertOutput(code, expected);
    });

    it("should replace right side", () => {
      const code = '[1, 2].map(10 * _)';

      const expected = `[1, 2].map(_2 => {
  return 10 * _2;
});`;

      assertOutput(code, expected);
    });

    it("should replace both sides", () => {
      const code = '[1, 2].map(_ * _)';

      const expected = `[1, 2].map((_2, _3) => {
  return _2 * _3;
});`;

      assertOutput(code, expected);
    });

  });

  describe("Member expressions", () => {

    it("should replace _ object", () => {
      const code = '["test"].map(_.length)';

      const expected = `["test"].map(_2 => {
  return _2.length;
});`;

      assertOutput(code, expected);
    });
  });

  describe("Call expressions", () => {

    it("should replace argument in function call", () => {
      const code = '["a", "b"].map(console.log(_))';

      const expected = `["a", "b"].map(_2 => {
  return console.log(_2);
});`;

      assertOutput(code, expected);
    });

    it("should replace multiple arguments in function call", () => {
      const code = '["a", "b"].map(console.log(_, _))';

      const expected = `["a", "b"].map((_2, _3) => {
  return console.log(_2, _3);
});`;

      assertOutput(code, expected);
    });

  });

});
