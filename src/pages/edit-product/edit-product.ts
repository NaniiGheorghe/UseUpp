import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Product } from "../../model/Product";
import { Category } from "../../model/Category";
import { ProductDbProvider } from "../../providers/product-db/product-db";

/**
 * Generated class for the EditProductPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-edit-product',
  templateUrl: 'edit-product.html',
})
export class EditProductPage {
  product: Product;
  clone: Product;
  category = Category.defaultCategory();

  constructor(public navCtrl: NavController, public navParams: NavParams, private productDbProvider: ProductDbProvider) {
    this.product = <Product>navParams.get('product');
    this.category = Category.findById(this.product.categoryId);

    this.clone = this.product.clone();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProductPage');
  }

  saveChanges() {
    this.product.updateFrom(this.clone);

    this.productDbProvider.put(this.product).then(r => {
      this.navCtrl.pop();
    });
  }

}
