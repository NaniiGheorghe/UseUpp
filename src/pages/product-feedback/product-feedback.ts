import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ProductFeedbackPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-product-feedback',
  templateUrl: 'product-feedback.html',
})
export class ProductFeedbackPage {
  type: string;
  description: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductFeedbackPage');
  }

  submit() {
    this.navCtrl.pop();
  }
}
