import { Component } from '@angular/core';
import { NavController, NavParams, App } from 'ionic-angular';
import { ProductDetailsSupportServcentersPage } from "../product-details-support-servcenters/product-details-support-servcenters";
import { ProductDetailsSupportUsermanualPage } from "../product-details-support-usermanual/product-details-support-usermanual";
import { ProductDetailsSupportVideosPage } from "../product-details-support-videos/product-details-support-videos";
import { Product } from "../../model/Product";
import { ProductDetailsSupportSpecs3dPage } from "../product-details-support-specs3d/product-details-support-specs3d";
import { WarrantyRequestPage } from "../warranty-request/warranty-request";
import { ProductDetailsSupportPurcheseSparePart } from '../product-details-support-purchaseSparePart/product-details-support-purchaseSparePart'
import { ProductFeedbackPage } from '../product-feedback/product-feedback';

/**
 * Generated class for the ProductDetailsSupportPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-product-details-support',
  templateUrl: 'product-details-support.html',
})
export class ProductDetailsSupportPage {
  product: Product;

  constructor(public navCtrl: NavController, public navParams: NavParams, public appCtrl: App) {
    this.product = navParams.get("product");
    console.log("product", this.product);
    console.log("product2", navParams.data.product);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductDetailsSupportPage');
  }

  public goToServiceCenters() {
    this.appCtrl.getRootNav().push(ProductDetailsSupportServcentersPage);
  }

  public goToUserManual() {
    this.appCtrl.getRootNav().push(ProductDetailsSupportUsermanualPage, { product: this.product });
  }

  public goToVideos() {
    this.appCtrl.getRootNav().push(ProductDetailsSupportVideosPage);
  }

  public goTo3dPrintingFiles() {
    this.appCtrl.getRootNav().push(ProductDetailsSupportSpecs3dPage, { product: this.product });
  }

  goToWarrantyRequest() {
    this.appCtrl.getRootNav().push(WarrantyRequestPage, { product: this.product });
  }

  public goSparePartPage() {
    this.navCtrl.push(ProductDetailsSupportPurcheseSparePart);
  }

  goToProductFeedback() {
    this.appCtrl.getRootNav().push(ProductFeedbackPage);
  }
}
