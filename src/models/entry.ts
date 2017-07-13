
import { Navigation } from './navigation';

export class Entry {
  public readonly fields: Object = new Object();
  public readonly dataHref: string;
  public readonly navigation: Navigation;

  public set(key: string, value: string): Entry {
    this.fields[key] = value;
    return this;
  }

  public json(): string {
    return JSON.stringify(this);
  }
}
