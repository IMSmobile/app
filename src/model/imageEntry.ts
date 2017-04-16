export class ImageEntry {
    fields: Object = new Object();

    set(key: string, value: string): ImageEntry {
        this.fields[key] = value;
        return this;
    }

    json(): string {
        return JSON.stringify(this);
    }
}
