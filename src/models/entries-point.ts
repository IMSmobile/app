import { Filter } from './filter';

export class EntriesPoint {
  filters: Filter[];

  constructor(filters: Filter[]) {
    this.filters = filters;
  }
}
