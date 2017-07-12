
export class ArchiveTableEntry {
  public readonly tableName: string;
  public readonly dataHref: string;
  public readonly modelHref: string;
  public readonly uploadHref?: string;

  constructor(tableName: string, dataHref: string = null, modelHref: string = null, uploadHref?: string) {
    this.tableName = tableName;
    this.dataHref = dataHref;
    this.modelHref = modelHref;
    this.uploadHref = uploadHref;
  }
}
