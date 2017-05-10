import { ModelLink } from './model-link';

export class ModelTables {
  name: string;
  tables: ModelLink[];

  constructor(name: string, tables: ModelLink[]) {
    this.name = name;
    this.tables = tables;
  }

}
