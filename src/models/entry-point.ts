import { Link } from './link';

export class EntryPoint {
  public readonly links: Link[];

  constructor(links: Link[]) {
    this.links = links;
  }
}
