import { NavController, NavParams } from 'ionic-angular';
import { Component, Input } from '@angular/core';
import { Product } from "../../model/Product";
import { FormControl } from '@angular/forms';
import { ProductDbProvider } from "../../providers/product-db/product-db";
import { WarrantyStatus } from "../../model/WarrantyStatus";
import { InvoicePhotoProvider } from "../../providers/invoice-photo/invoice-photo";
/**
 * Generated class for the ProductDetailsWarrantyPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-product-details-warranty',
  templateUrl: 'product-details-warranty.html',
})
export class ProductDetailsWarrantyPage {

  product: Product;
  warrantyStatus: WarrantyStatus;
  base64Image: any;
  notes = new FormControl();

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private productDbProvider: ProductDbProvider,
    private invoicePhotoProvider: InvoicePhotoProvider) {
    this.product = navParams.get('product');
    console.log("Product is - ", this.product);

    this.warrantyStatus = this.product.updateRemainingWarranty();
    this.base64Image = navParams.get('base64Image');
    console.log("Base64 Image is - ", this.base64Image);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductDetailsWarrantyPage');
  }

  saveNotes() {
    this.productDbProvider.put(this.product).then(r => {
      this.notes.markAsPristine();
    });
  }


  @Input() public max: number = 5;
  @Input() public iconEmpty: string = 'star-outline';
  @Input() public iconHalf: string = 'star-half';
  @Input() public iconFull: string = 'star';

  public update(index: number) {
    this.product.startScore = index;

    this.productDbProvider.put(this.product).then(res => {
    });
  }

  public icons(): string[] {
    let step = 0.5;
    let score = Math.ceil(this.product.startScore / step) * step;

    let icons = [];
    for (let i = 1; i <= this.max; i++) {
      if (i <= score) {
        icons.push(this.iconFull);
      } else if (i - step <= score) {
        icons.push(this.iconHalf);
      } else {
        icons.push(this.iconEmpty);
      }
    }
    return icons;
  }

  public addProductPhoto() {
    let product = <Product>this.navParams.get('product');

    this.invoicePhotoProvider.addProductPhoto(product).then(result => {
      this.loadProductPhoto();
    });
  }

  loadProductPhoto() {
    this.productDbProvider.getProductPhoto(this.product._id)
      .then(img => {
        this.product.srcImage = img;
        this.productDbProvider.put(this.product);
        console.log('Found product photo. File size: ', img != null ? img.length : 0);
      })
      .catch(err => {
        console.log('No invoice', err);
      });
  }

}
