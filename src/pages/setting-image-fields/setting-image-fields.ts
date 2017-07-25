import { Component } from '@angular/core';
import { ImsLoadingError } from './../../models/errors/ims-loading-error';
import { MetadataField } from './../../models/metadata-field';
import { AuthService } from './../../providers/auth-service';
import { LoadingService } from './../../providers/loading-service';
import { ModelService } from './../../providers/model-service';
import { SettingService } from './../../providers/setting-service';

@Component({
  selector: 'page-setting-image-fields',
  templateUrl: 'setting-image-fields.html'
})
export class SettingImageFieldsPage {

  public tableName: string;
  public fields: MetadataField[];

  constructor(public loadingService: LoadingService, public authService: AuthService, public modelService: ModelService, public settingService: SettingService) { }

  public ionViewDidLoad(): void {
    this.loadingService.subscribeWithLoading(this.modelService.getMetadataFieldsOfImageTable(this.authService.archive),
      tableFields => {
        this.tableName = tableFields.name;
        this.fields = tableFields.fields.filter(field => !field.mandatory && field.name !== tableFields.parentReferenceField && field.writable);
        this.fields.forEach(field => field.display = true);
        this.fields.forEach(field => this.settingService.getFieldState(this.authService.archive, this.tableName, field.name).subscribe(active => field.active = active));
      },
      err => {
        throw new ImsLoadingError('Feldinformationen', err);
      });
  }

  public fieldToggled(field: MetadataField): void {
    this.settingService.setFieldState(this.authService.archive, this.tableName, field.name, field.active);
  }
}
