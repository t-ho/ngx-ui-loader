import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';

export function update1000(_options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    return tree;
  };
}
