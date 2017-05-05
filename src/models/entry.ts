
import { Navigation } from './navigation';

export class Entry {
    fields: Object = new Object();
    dataHref: string;
    navigation: Navigation;

    set(key: string, value: string): Entry {
        this.fields[key] = value;
        return this;
    }

    json(): string {
        return JSON.stringify(this);
    }
}
