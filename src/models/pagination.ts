export class Pagination {
  public readonly start?: number;
  public readonly pageSize?: number;
  public readonly previousPage?: string;
  public readonly nextPage?: string;
  public readonly totalEntries?: number;

  constructor(paginationArgs: PaginationArgs) {
    this.start = paginationArgs.start;
    this.pageSize = paginationArgs.pageSize;
    this.previousPage = paginationArgs.previousPage;
    this.nextPage = paginationArgs.nextPage;
    this.totalEntries = paginationArgs.totalEntries;
  }
}

export declare type PaginationArgs = {
  start?: number;
  pageSize?: number;
  previousPage?: string;
  nextPage?: string;
  totalEntries?: number;
};
