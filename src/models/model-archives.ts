import { ModelLink } from './model-link';

export class ModelArchives {
  public readonly archives: ModelLink[];

  constructor(archives: ModelLink[]) {
    this.archives = archives;
  }

}
