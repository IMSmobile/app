import { ModelLink } from './model-link';

export class ModelTables {
  public readonly name: string;
  public readonly tables: ModelLink[];

  constructor(name: string, tables: ModelLink[]) {
    this.name = name;
    this.tables = tables;
  }

}
