export class Filter {
  public readonly dataHref: string;
  public readonly id: string;
  public readonly name?: string;
  public readonly archiveName?: string;

  constructor(dataHref: string, id: string, name?: string, archiveName?: string) {
    this.dataHref = dataHref;
    this.id = id;
    this.name = name;
    this.archiveName = archiveName;
  }
}
