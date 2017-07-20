import { Component } from '@angular/core';
import { Events, NavController, NavParams } from 'ionic-angular';
import { Keyword } from '../../models/keyword';
import { ImsLoadingError } from './../../models/errors/ims-loading-error';
import { MetadataField } from './../../models/metadata-field';
import { AuthService } from './../../providers/auth-service';
import { KeywordService } from './../../providers/keyword-service';
import { LoadingService } from './../../providers/loading-service';
import { UploadPage } from './../upload/upload';

@Component({
  selector: 'page-keywords',
  templateUrl: 'keywords.html',
})
export class KeywordsPage {

  public keywords: Keyword[];
  public field: MetadataField;
  constructor(public navCtrl: NavController, public navParams: NavParams, public keywordService: KeywordService, public authService: AuthService, public loadingService: LoadingService, public events: Events) {
    this.field = this.navParams.get('field');
    this.loadingService.subscribeWithLoading(this.keywordService.getKeywordCatalogue(authService.currentCredential, this.field),
      keywordCatalogue => { this.keywords = keywordCatalogue.keywords; },
      err => { throw new ImsLoadingError('Keywordcatalogue', err); });
  }

  public selectKeyword(keyword: Keyword): void {
    this.events.publish('keyword: selected', this.field, keyword );
    this.navCtrl.popTo(UploadPage);
  }
}
