import { Entry } from './entry';
import { Pagination } from './pagination';

export class Entries {
  public readonly pagination: Pagination;
  public readonly entries: Entry[];

  constructor(pagination: Pagination, entries: Entry[]) {
    this.pagination = pagination;
    this.entries = entries;
  }

}
