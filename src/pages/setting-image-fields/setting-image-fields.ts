import { ImsLoadingError } from './../../models/errors/ims-loading-error';
import { SettingService } from './../../providers/setting-service';
import { MetadataField } from './../../models/metadata-field';
import { ModelService } from './../../providers/model-service';
import { AuthService } from './../../providers/auth-service';
import { LoadingService } from './../../providers/loading-service';
import { Component } from '@angular/core';

@Component({
  selector: 'page-setting-image-fields',
  templateUrl: 'setting-image-fields.html'
})
export class SettingImageFieldsPage {

  tableName: string;
  fields: MetadataField[];

  constructor(public loadingService: LoadingService, public authService: AuthService, public modelService: ModelService, public settingService: SettingService) { }

  ionViewDidLoad() {
    this.loadingService.subscribeWithLoading(this.modelService.getMetadataFieldsOfImageTable(this.authService.currentCredential, this.authService.archive),
      tableFields => {
        this.tableName = tableFields.name;
        this.fields = tableFields.fields.filter(field => field.mandatory === false && field.name !== tableFields.parentReferenceField && field.writable === true);
        this.fields.forEach(field => field.display = true);
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
