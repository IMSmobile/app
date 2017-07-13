import { Response, ResponseOptions} from '@angular/http';
import { MetadataTableFields } from './../../models/metadata-table-fields';

export class ModelFieldsPointResponse extends Response {

  constructor(metadataTableFields: MetadataTableFields) {
    super(new ResponseOptions({ body: metadataTableFields }));
  }
}
