import { Component } from '@angular/core';
import { NavController, NavParams, App } from 'ionic-angular';
import { Product } from "../../model/Product";
import { ProductDbProvider } from "../../providers/product-db/product-db";
import { InvoicePhotoProvider } from "../../providers/invoice-photo/invoice-photo";
import { Category } from "../../model/Category";

/**
 * Generated class for the ProductDetailsPurchasePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-product-details-purchase',
  templateUrl: 'product-details-purchase.html',
})
export class ProductDetailsPurchasePage {

  static readonly NO_INVOICE = './assets/images/invoice-transp.png';

  product: Product;
  category = Category.defaultCategory();
  invoiceSrc = ProductDetailsPurchasePage.NO_INVOICE;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private productDbProvider: ProductDbProvider,
    private invoicePhotoProvider: InvoicePhotoProvider,
    public appCtrl: App) {
    this.product = <Product>navParams.get('product');
    this.category = Category.findById(this.product.categoryId);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductDetailsPurchasePage');

    this.loadInvoicePhoto();
  }

  public invoiceMissing(): boolean {
    return this.invoiceSrc == ProductDetailsPurchasePage.NO_INVOICE;
  }

  public addInvoicePhoto() {
    let product = <Product>this.navParams.get('product');

    this.invoicePhotoProvider.addInvoicePhoto(product).then(result => {
      this.loadInvoicePhoto();
    });
  }

  private loadInvoicePhoto() {
    this.productDbProvider.getInvoicePhoto(this.product._id)
      .then(img => {
        this.invoiceSrc = img;
        console.log('Found invoice. File size: ', img != null ? img.length : 0);
      })
      .catch(err => {
        console.log('No invoice', err);
      });
  }

  public formattedWarrantyPeriod() {
    if (this.product.warrantyPeriod > 0) 
      return this.product.warrantyPeriod + " months";
    else if (this.product.warrantyPeriod == -1)
      return "Lifetime";
    else if (this.product.warrantyPeriod == -2)
      return "Other";
  }

}
