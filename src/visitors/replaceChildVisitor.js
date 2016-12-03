import { T_UNDERSCORE } from "../utils";

export const replaceChildVisitor = {
  Identifier(path) {
    const { name } = path.node;

    if (name === T_UNDERSCORE) {
      path.node.name = this.id.name;
      path.stop();
    }
  }
}
