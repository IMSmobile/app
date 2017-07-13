export class QueryFragment {
  public readonly key: string;
  public readonly value: string;

  constructor(key: string, value: string) {
    this.key = key;
    this.value = value;
  }
}
