import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MetadataField } from './../../models/metadata-field';

@Component({
  selector: 'ims-field-selection',
  templateUrl: 'ims-field-selection.html'
})
export class ImsFieldSelectionComponent {

  public displayFields: MetadataField[];
  public allFields: MetadataField[];

  @Input()
  public set fields(fields: MetadataField[]) {
    this.displayFields = fields;
    this.allFields = fields;
  }

  @Output() public fieldToggled: EventEmitter<MetadataField> = new EventEmitter<MetadataField>();

  constructor() { }

  public sendFieldToggledEvent(field: MetadataField): void {
    this.fieldToggled.emit(field);
  }

  public filterFields(ev: any): void {
    this.allFields.forEach(field => field.display = true);
    const val = ev.target.value;
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
