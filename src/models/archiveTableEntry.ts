
export class ArchiveTableEntry {
    tableName: string;
    dataHref: string;
    modelHref: string;
    uploadHref: string;

 constructor(tableName: string, dataHref: string = null, modelHref: string = null, uploadHref: string = null) {
    this.tableName = tableName;
    this.dataHref = dataHref;
    this.modelHref = modelHref;
    this.uploadHref = uploadHref;
 }
}
