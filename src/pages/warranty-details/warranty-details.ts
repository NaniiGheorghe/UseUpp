import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProductDbProvider } from "../../providers/product-db/product-db";
import { Product } from "../../model/Product";
import { CurrencyUtil } from "../../util/CurrencyUtil";

/**
 * Generated class for the WarrantyDetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-warranty-details',
  templateUrl: 'warranty-details.html',
})
export class WarrantyDetailsPage {
  product: Product;
  currencies = Object.keys(CurrencyUtil.currencies);

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private productDbProvider: ProductDbProvider) {
      this.product = this.navParams.get('product');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WarrantyDetailsPage');    
  }

  done() {
    this.productDbProvider.put(this.product).then(r => {
      this.navCtrl.popToRoot();
    });
  }

}
