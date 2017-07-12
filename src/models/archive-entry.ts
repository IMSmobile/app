import { ArchiveTableEntry } from './archive-table-entry';

export class ArchiveEntry {
  public readonly archiveName: string;
  public readonly tables: ArchiveTableEntry[];

  constructor(archiveName: string, tables: ArchiveTableEntry[]) {
    this.archiveName = archiveName;
    this.tables = tables;
  }

}
