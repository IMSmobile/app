import { ArchiveTableEntry } from './archiveTableEntry';

export class ArchiveEntry {
    archiveName: string;
    tables: ArchiveTableEntry[];

    constructor(archiveName: string, tables: ArchiveTableEntry[]) {
        this.archiveName = archiveName;
        this.tables = tables;
    }

    getUploadsLink(): string {
        for (let table of this.tables) {
            if (table.uploadHref != null) {
                return table.uploadHref;
            }
        }
        throw new TypeError('No upload link found');
    }
}
