import { Filter } from './filter';

export class EntriesPoint {
  public readonly filters: Filter[];

  constructor(filters: Filter[]) {
    this.filters = filters;
  }
}
