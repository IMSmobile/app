import { ModelTables } from './../../models/model-tables';
import { Response, ResponseOptions} from '@angular/http';

export class ModelTablesPointResponse extends Response {

  constructor(modelTables: ModelTables) {
    super(new ResponseOptions({ body: modelTables }));
  }
}
