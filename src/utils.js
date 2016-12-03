import { replaceChildVisitor } from './visitors/replaceChildVisitor';

export const T_UNDERSCORE = "_";

export const isUnderscore =
  ({ name }) => name && name === T_UNDERSCORE;

export function replaceChildsUnderscoreWithId(path, id) {
  path.traverse(replaceChildVisitor, { id });
  path.stop();
}

export const generateIdFromScope = scope =>
  scope.generateUidIdentifier(T_UNDERSCORE);
