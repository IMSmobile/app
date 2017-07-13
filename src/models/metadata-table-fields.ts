import { MetadataField } from './metadata-field';

export class MetadataTableFields {
  public readonly name: string;
  public readonly identifierField: string;
  public readonly parentReferenceField: string;
  public readonly fields: MetadataField[];

  constructor(name: string, identifierField: string, parentReferenceField: string, fields: MetadataField[]) {
    this.name = name;
    this.identifierField = identifierField;
    this.parentReferenceField = parentReferenceField;
    this.fields = fields;
  }
}
