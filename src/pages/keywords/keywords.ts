import { Component } from '@angular/core';
import { Events, NavController, NavParams, ViewController } from 'ionic-angular';
import { Keyword } from '../../models/keyword';
import { MetadataField } from './../../models/metadata-field';

@Component({
  selector: 'page-keywords',
  templateUrl: 'keywords.html',
})
export class KeywordsPage {

  public keywords: Keyword[];
  public field: MetadataField;
  public uploadrootpage: ViewController;
  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events) {
    this.field = this.navParams.get('field');
    this.keywords = this.navParams.get('keywords');
    this.uploadrootpage = this.navParams.get('uploadrootpage');
  }

  public selectKeyword(keyword: Keyword): void {
    if (keyword.children !== undefined) {
      this.navCtrl.push(KeywordsPage, {field: this.field, keywords: keyword.children, uploadrootpage: this.uploadrootpage});
    } else {
      this.events.publish('keyword: selected', this.field, keyword);
      this.navCtrl.popTo(this.uploadrootpage);
    }
  }
}
