import { ArchiveTableEntry } from './archiveTableEntry';

export class ArchiveEntry {
    archiveName: string;
    tables: ArchiveTableEntry[];

    constructor(archiveName: string, tables: ArchiveTableEntry[]) {
        this.archiveName = archiveName;
        this.tables = tables;
    }

}
