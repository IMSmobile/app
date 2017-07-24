import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { Observable } from 'rxjs/Observable';
import { MetadataTableFields } from './../models/metadata-table-fields';
import { ModelLink } from './../models/model-link';
import { ModelTables } from './../models/model-tables';
import { ImsService } from './ims-service';

@Injectable()
export class ModelService {

  private readonly parentImageTableOffset: number = 1;

  constructor(public imsService: ImsService) { }

  public getMetadataFieldsOfImageTable(archive: string): Observable<MetadataTableFields> {
    return this.getModelImageTableUrl(archive).flatMap(tableUrl =>
      this.imsService.get(tableUrl).map(response => response.json()));
  }

  public getModelImageTableUrl(archive: string): Observable<string> {
    return this.getModelTables(archive).map(modelTable => modelTable.tables[(modelTable.tables.length - 1)].dataHref);
  }

  public getMetadataFieldsOfParentImageTable(archive: string): Observable<MetadataTableFields> {
    return this.getModelParentImageTableUrl(archive).flatMap(tableUrl =>
      this.imsService.get(tableUrl).map(response => response.json()));
  }

  public getModelParentImageTableUrl(archive: string): Observable<string> {
    return this.getModelTables(archive).map(modelTable => modelTable.tables[(modelTable.tables.length - this.parentImageTableOffset - 1)].dataHref);
  }

  public getModelTables(archive: string): Observable<ModelTables> {
    return this.getModelArchiveUrl(archive).flatMap(archiveUrl =>
      this.imsService.get(archiveUrl).map(response => response.json()));
  }

  public getModelArchiveUrl(archive: string): Observable<string> {
    return this.imsService.getModelArchives().map(modelArchives => modelArchives.archives.find(this.findModelArchive, archive).dataHref);
  }

  private findModelArchive(this: string, modelArchive: ModelLink): boolean {
    return modelArchive.name === this;
  }

}
