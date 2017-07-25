import { Keyword } from './keyword';
export class KeywordCatalog {
  public readonly id: string;
  public readonly name: string;
  public readonly keywords: Keyword[];

  constructor(id: string, name: string, keywords: Keyword[]) {
    this.id = id;
    this.name = name;
    this.keywords = keywords;
  }
}
