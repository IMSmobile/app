import { MetadataField } from './../../models/metadata-field';
import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'ims-field-selection',
  templateUrl: 'ims-field-selection.html'
})
export class ImsFieldSelectionComponent {

  displayFields: MetadataField[];
  allFields: MetadataField[];

  @Input()
  set fields(fields: MetadataField[]) {
    this.displayFields = fields;
    this.allFields = fields;
  }

  @Output() fieldToggled: EventEmitter<MetadataField> = new EventEmitter<MetadataField>();

  constructor() { }

  sendFieldToggledEvent(field: MetadataField): void {
    this.fieldToggled.emit(field);
  }

  filterFields(ev: any): void {
    this.allFields.forEach(field => field.display = true);
    let val = ev.target.value;
    if (val && val.trim() !== '') {
      this.allFields.forEach(field => {
        if (!(field.name.toLowerCase().indexOf(val.toLowerCase()) > -1)) {
          field.display = false;
        }
      });
    }
    this.displayFields = this.allFields.filter(field => field.display);
  }
}
