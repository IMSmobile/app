
export class ArchiveTableEntry {
  tableName: string;
  dataHref?: string;
  modelHref?: string;
  uploadHref?: string;

  constructor(tableName: string, dataHref?: string, modelHref?: string, uploadHref?: string) {
    this.tableName = tableName;
    this.dataHref = dataHref;
    this.modelHref = modelHref;
    this.uploadHref = uploadHref;
  }
}
