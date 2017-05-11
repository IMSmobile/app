import { MetadataTableFields } from './../../models/metadata-table-fields';
import { Response, ResponseOptions} from '@angular/http';

export class ModelFieldsPointResponse extends Response {

  constructor(metadataTableFields: MetadataTableFields) {
    super(new ResponseOptions({ body: metadataTableFields }));
  }
}
