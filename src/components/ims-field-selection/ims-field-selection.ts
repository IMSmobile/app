import { SettingService } from './../../providers/setting-service';
import { AlertService } from './../../providers/alert-service';
import { ModelService } from './../../providers/model-service';
import { AuthService } from './../../providers/auth-service';
import { LoadingService } from './../../providers/loading-service';
import { MetadataField } from './../../models/metadata-field';
import { Component } from '@angular/core';


@Component({
  selector: 'ims-field-selection',
  templateUrl: 'ims-field-selection.html'
})
export class ImsFieldSelectionComponent {

  fields: MetadataField[];
  displayFields: MetadataField[];
  tableName: string;
  archiveName: string = 'workflow_db1';

  constructor(public loadingService: LoadingService, public authService: AuthService, public modelService: ModelService, public alertService: AlertService, public settingService: SettingService) { }

  ngAfterViewInit() {
    this.loadingService.subscribeWithLoading(this.modelService.getMetadataFieldsOfImageTable(this.authService.currentCredential, this.archiveName),
      tableFields => {
        this.tableName = tableFields.name;
        this.fields = tableFields.fields.filter(field => field.mandatory === false && field.name !== tableFields.parentReferenceField && field.writable === true);
        this.fields.forEach(field => field.display = true);
        this.fields.forEach(field => this.settingService.getFieldState(this.archiveName, this.tableName, field.name).subscribe(active => field.active = active));
        this.displayFields = this.fields;
      },
      err => {
        this.alertService.showError('Beim Laden der Feldinformationen ist ein Fehler aufgetreten.');
      });
  }

  notify(name: string, active: boolean) {
    this.settingService.setFieldState(this.archiveName, this.tableName, name, active);
  }

  filterFields(ev: any) {
    this.fields.forEach(field => field.display = true);
    let val = ev.target.value;
    if (val && val.trim() !== '') {
      this.fields.forEach(field => {
        if (!(field.name.toLowerCase().indexOf(val.toLowerCase()) > -1)) {
          field.display = false;
        }
      });
    }
    this.displayFields = this.fields.filter(field => field.display);
  }
}
