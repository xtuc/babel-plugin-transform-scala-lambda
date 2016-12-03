import { assert } from 'chai';
import { isUnderscore } from '../src/utils';
import { identifier } from "babel-types";

describe("utils", () => {

  describe("has identifier underscore", () => {

    it("should return true", () => {
      const id = identifier("_");

      assert.isTrue(isUnderscore(id));
    });

    it("should return false (x)", () => {
      const id = identifier("x");

      assert.isFalse(isUnderscore(id));
    });

    it("should return false (_x)", () => {
      const id = identifier("_x");

      assert.isFalse(isUnderscore(id));
    });

  });

});
