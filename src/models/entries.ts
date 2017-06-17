import { Entry } from './entry';
import { Pagination } from './pagination';

export class Entries {
  pagination: Pagination;
  entries: Entry[];

  constructor(pagination: Pagination, entries: Entry[]) {
    this.pagination = pagination;
    this.entries = entries;
  }

}
