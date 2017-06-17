import { ArchiveTableEntry } from './archive-table-entry';

export class ArchiveEntry {
  archiveName: string;
  tables: ArchiveTableEntry[];

  constructor(archiveName: string, tables: ArchiveTableEntry[]) {
    this.archiveName = archiveName;
    this.tables = tables;
  }

}
