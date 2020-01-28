import { Component } from '@angular/core';
import { NavController, NavParams, App, ViewController, AlertController } from 'ionic-angular';
import { ProductDbProvider } from "../../providers/product-db/product-db";
import { Product } from "../../model/Product";
import { EditProductPage } from '../edit-product/edit-product';

/**
 * Generated class for the ProductDetailsPopoverPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-product-details-popover',
  templateUrl: 'product-details-popover.html',
})
export class ProductDetailsPopoverPage {
  product: Product;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private productDbProvider: ProductDbProvider,
    public appCtrl: App,
    public viewCtrl: ViewController,
    private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductDetailsPopoverPage');

    this.product = this.navParams.get('product');
  }

  itemEdit() {
    this.appCtrl.getRootNav().push(EditProductPage, { product: this.product });
    this.viewCtrl.dismiss();
  }

  itemDelete() {
    console.log('Deleting product', this.product);

    let alert = this.alertCtrl.create({
      title: 'Confirm delete',
      message: 'Delete ' + this.product.brand + ' ' + this.product.name + '?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
            this.viewCtrl.dismiss();
          }
        },
        {
          text: 'Delete',
          handler: () => {
            this.productDbProvider.delete(this.product).then(r => {
              this.appCtrl.getRootNav().popToRoot();
              this.viewCtrl.dismiss();
            }).catch(err => {
              console.warn("Product couldn't be removed", err);
            });
          }
        }
      ]
    });
    alert.present();
  }
}
