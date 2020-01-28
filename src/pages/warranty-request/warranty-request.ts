import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProductDbProvider } from "../../providers/product-db/product-db";
import { Product } from "../../model/Product";
import { WarrantyRequest } from "../../model/WarrantyRequest";

/**
 * Generated class for the WarrantyRequestPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-warranty-request',
  templateUrl: 'warranty-request.html',
})
export class WarrantyRequestPage {
  product: Product;
  clone: WarrantyRequest;
  new: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private productDbProvider: ProductDbProvider) {
    this.product = <Product>navParams.get('product');

    let warrantyRequest = this.product.warrantyRequest;
    if (warrantyRequest) {
      console.log("warrantyRequest", warrantyRequest);
      this.clone = warrantyRequest.clone();
      this.new = false;
    }
    else {
      this.clone = new WarrantyRequest();
      this.new = true;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WarrantyRequestPage');
  }

  submit() {
    this.product.warrantyRequest = this.clone;
    this.clone = this.product.warrantyRequest.clone();

    this.productDbProvider.put(this.product).then(r => {
      this.navCtrl.pop();
    });
  }

  cancel() {
    this.product.warrantyRequest = null;

    this.productDbProvider.put(this.product).then(r => {
      return this.navCtrl.pop();
    });
  }

}
