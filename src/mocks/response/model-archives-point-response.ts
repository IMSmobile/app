import { Response, ResponseOptions} from '@angular/http';
import { ModelArchives } from './../../models/model-archives';

export class ModelArchivesPointResponse extends Response {

  constructor(modelArchives: ModelArchives) {
    super(new ResponseOptions({ body: modelArchives }));
  }
}
