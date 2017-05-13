export class MetadataField {
  name: string;
  type: string;
  sortable: boolean;
  searchable: boolean;
  writable: boolean;
  mandatory: boolean;
  length: number;
  active?: boolean = false;
  display?: boolean = true;

  constructor(name: string, type: string, sortable: boolean, searchable: boolean, writable: boolean, mandatory: boolean, length: number) {
    this.name = name;
    this.type = type;
    this.sortable = sortable;
    this.searchable = searchable;
    this.writable = writable;
    this.mandatory = mandatory;
    this.length = length;
  }
}
