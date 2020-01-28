import { Component } from '@angular/core';
import { NavController, NavParams, PopoverController } from 'ionic-angular';
import { ProductDetailsPopoverPage } from "../product-details-popover/product-details-popover";
import { Product } from "../../model/Product";
import { ProductDetailsWarrantyPage } from "../product-details-warranty/product-details-warranty";
import { ProductDetailsPurchasePage } from "../product-details-purchase/product-details-purchase";
import { ProductDetailsSupportPage } from "../product-details-support/product-details-support";

/**
 * Generated class for the ProductDetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-product-details',
  templateUrl: 'product-details.html',
})
export class ProductDetailsPage {
  tab1Warranty = ProductDetailsWarrantyPage;
  tab2Purchase = ProductDetailsPurchasePage;
  tab3Support = ProductDetailsSupportPage;

  tabsParams = {
    product: <Product>{},
  };

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private popoverCtrl: PopoverController) {
    this.tabsParams.product = this.navParams.get('product');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductDetailsPage product', this.tabsParams.product);
  }

  presentPopover(ev) {

    console.log('this.product._id', this.tabsParams.product._id);

    let popover = this.popoverCtrl.create(ProductDetailsPopoverPage, {
      product: this.tabsParams.product
    });

    popover.present({
      ev: ev
    });
  }
}
