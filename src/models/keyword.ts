export class Keyword {
  public readonly keyword: string;
  public readonly children?: Keyword[];

  constructor(keyword: string, children?: Keyword[]) {
    this.keyword = keyword;
    this.children = children;
  }
}
