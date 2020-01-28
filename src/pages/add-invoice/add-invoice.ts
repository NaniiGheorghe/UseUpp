import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { WarrantyDetailsPage } from "../warranty-details/warranty-details";
import { Product } from "../../model/Product";
import { InvoicePhotoProvider } from "../../providers/invoice-photo/invoice-photo";

/**
 * Generated class for the AddInvoicePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-add-invoice',
  templateUrl: 'add-invoice.html',
})
export class AddInvoicePage {

  product: Product;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private invoicePhotoProvider: InvoicePhotoProvider) {

    this.product = <Product>this.navParams.get('product');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddInvoicePage');
  }

  addInvoice() {
    console.log("addInvoice");
    this.invoicePhotoProvider.addInvoicePhoto(this.product).then(result => {
      this.navCtrl.push(WarrantyDetailsPage, { product: this.product });
    });
  }

  noInvoice() {
    console.log("noInvoice", this.product);
    this.navCtrl.push(WarrantyDetailsPage, { product: this.product });
  }

  remindAddInvoiceLater() {
    console.log("remindAddInvoiceLater", this.product);
    this.navCtrl.push(WarrantyDetailsPage, { product: this.product });
  }
}
