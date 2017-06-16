export class Filter {
  dataHref: string;
  id: string;
  name: string;
  archiveName: string;

  constructor(dataHref: string, id: string, name: string = null, archiveName: string = null) {
    this.dataHref = dataHref;
    this.id = id;
    this.name = name;
    this.archiveName = archiveName;
  }
}
