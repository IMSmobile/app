import { MetadataField } from './metadata-field';

export class MetadataTableFields {
  name: string;
  identifierField: string;
  parentReferenceField: string;
  fields: MetadataField[];

  constructor(name: string, identifierField: string, parentReferenceField: string, fields: MetadataField[]) {
    this.name = name;
    this.identifierField = identifierField;
    this.parentReferenceField = parentReferenceField;
    this.fields = fields;
  }
}
