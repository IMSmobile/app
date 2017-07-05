import { Component } from '@angular/core';
import { ImsLoadingError } from './../../models/errors/ims-loading-error';
import { MetadataField } from './../../models/metadata-field';
import { AuthService } from './../../providers/auth-service';
import { LoadingService } from './../../providers/loading-service';
import { ModelService } from './../../providers/model-service';
import { SettingService } from './../../providers/setting-service';

@Component({
  selector: 'page-setting-entries-fields',
  templateUrl: 'setting-entries-fields.html',
})
export class SettingEntriesFieldsPage {

  tableName: string;
  fields: MetadataField[];

  constructor(public loadingService: LoadingService, public authService: AuthService, public modelService: ModelService, public settingService: SettingService) { }

  ionViewDidLoad() {
    this.loadingService.subscribeWithLoading(this.modelService.getMetadataFieldsOfParentImageTable(this.authService.currentCredential, this.authService.archive),
      tableFields => {
        this.tableName = tableFields.name;
        this.fields = tableFields.fields;
        this.fields.forEach(field => this.settingService.getFieldState(this.authService.archive, this.tableName, field.name).subscribe(active => field.active = active));
      },
      err => {
        throw new ImsLoadingError('Feldinformationen', err);
      });
  }

  fieldToggled(field: MetadataField) {
    this.settingService.setFieldState(this.authService.archive, this.tableName, field.name, field.active);
  }
}
