/* eslint-disable prefer-arrow/prefer-arrow-functions */
import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';

export function update1000(_options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => tree;
}
