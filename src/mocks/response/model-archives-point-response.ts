import { ModelArchives } from './../../models/model-archives';
import { Response, ResponseOptions} from '@angular/http';

export class ModelArchivesPointResponse extends Response {

  constructor(modelArchives: ModelArchives) {
    super(new ResponseOptions({ body: modelArchives }));
  }
}
