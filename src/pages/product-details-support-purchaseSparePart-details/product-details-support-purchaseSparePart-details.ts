import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CategoryProductsPage } from '../category-products/category-products'

/**
 * Generated class for the ProductDetailsSupportServcentersPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'product-details-support-purchaseSparePart-details',
  templateUrl: 'product-details-support-purchaseSparePart-details.html',
})
export class ProductDetailsSupportPurcheseSparePartDetails {
  sparePart: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.sparePart = this.navParams.get('sparePart');
    console.log("Spare part clicked - ", this.sparePart)
    this.sparePart.header = 'LCD Display+Touch Screen Digitizer Replacement For iphone 6 6s 4.7" - intl';
    this.sparePart.description = 'Used to repair faulty screen: display problems, dead pixels, cracked LCD screens';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductDetailsSupportPurcheseSparePartDetails');
  }

  push() {
    this.navCtrl.popTo(CategoryProductsPage);
  }
}