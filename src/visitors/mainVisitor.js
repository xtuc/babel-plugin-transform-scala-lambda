import {
  T_UNDERSCORE,
  isUnderscore,
  replaceChildsUnderscoreWithId,
  generateIdFromScope
} from '../utils';

import {replaceChildVisitor} from './replaceChildVisitor';

const t = require('babel-types');

export const mainVisitor = {

  CallExpression(path) {
    const nodes = path.node.arguments.filter(isUnderscore);

    if (nodes.length > 0) {

      const ids = nodes.map(() =>
        path.scope.generateUidIdentifier(T_UNDERSCORE)
      );

      const body = t.blockStatement([
        t.returnStatement(path.node)
      ]);

      path.replaceWith(
        t.arrowFunctionExpression(ids, body)
      );

      ids.forEach((id) => {
        path.traverse(replaceChildVisitor, {id});
      });

      path.stop();
    }
  },

  MemberExpression(path) {
    const {object} = path.node;

    if (isUnderscore(object)) {
      const id = generateIdFromScope(path.scope);

      const body = t.blockStatement([
        t.returnStatement(path.node)
      ]);

      path.replaceWith(
        t.arrowFunctionExpression([id], body)
      );

      replaceChildsUnderscoreWithId(path, id);
    }

  },

  BinaryExpression(path) {
    const {left, right} = path.node;
    const nodes = [left, right].filter(isUnderscore);

    if (nodes.length > 0) {
      const ids = nodes.map(() =>
        generateIdFromScope(path.scope)
      );

      const body = t.blockStatement([
        t.returnStatement(path.node)
      ]);

      path.replaceWith(
        t.arrowFunctionExpression(ids, body)
      );

      ids.forEach((id) => replaceChildsUnderscoreWithId(path, id));
    }
  }

};
