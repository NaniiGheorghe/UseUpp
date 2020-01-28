import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProductDetailsPage } from "../product-details/product-details";
import { Category } from "../../model/Category";
import { NewWarrantyPage } from "../new-warranty/new-warranty";

/**
 * Generated class for the CategoryProductsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-category-products',
  templateUrl: 'category-products.html',
})
export class CategoryProductsPage {

  category: Category = new Category('', '', '', '');

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    let passedCategory = this.navParams.get('category');

    if (passedCategory) {
      this.category = passedCategory;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoryProductsPage');
  }

  products() {
    return this.category.products;
  }

  productClick(product) {
    console.log('product click', product);
    this.navCtrl.push(ProductDetailsPage, { product: product });
  }

  addNewProduct(category) {
    this.navCtrl.push(NewWarrantyPage, { category: category });
  }
}
