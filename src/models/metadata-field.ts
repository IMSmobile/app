export class MetadataField {
  public readonly name: string;
  public readonly type: string;
  public readonly sortable: boolean;
  public readonly searchable: boolean;
  public readonly writable: boolean;
  public readonly mandatory: boolean;
  public readonly length: number;
  public readonly catalogHref?: string;
  public active?: boolean = false;
  public display?: boolean = true;

  constructor(name: string, type: string, sortable: boolean, searchable: boolean, writable: boolean, mandatory: boolean, length: number, catalogHref?: string) {
    this.name = name;
    this.type = type;
    this.sortable = sortable;
    this.searchable = searchable;
    this.writable = writable;
    this.mandatory = mandatory;
    this.length = length;
    this.catalogHref = catalogHref;
  }
}
