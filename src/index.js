import { mainVisitor } from './visitors/mainVisitor';

export default function ({ types: t }) {

  return {
    visitor: mainVisitor
  }
}
