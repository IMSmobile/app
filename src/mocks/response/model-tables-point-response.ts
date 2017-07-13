import { Response, ResponseOptions} from '@angular/http';
import { ModelTables } from './../../models/model-tables';

export class ModelTablesPointResponse extends Response {

  constructor(modelTables: ModelTables) {
    super(new ResponseOptions({ body: modelTables }));
  }
}
