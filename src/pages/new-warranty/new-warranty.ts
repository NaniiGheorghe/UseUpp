import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Product } from "../../model/Product";
import { ProductDbProvider } from "../../providers/product-db/product-db";
import * as Uuid from "uuid";
import { AddInvoicePage } from "../add-invoice/add-invoice";
import { Category } from "../../model/Category";
import firebase from 'firebase';
import { Reminder } from "../../model/Reminder";
import { ImageUtil } from "../../util/ImageUtil";
/**
 * Generated class for the NewWarrantyPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-new-warranty',
  templateUrl: 'new-warranty.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewWarrantyPage {
  product: Product;
  category: Category;
  base64Photo: string;
  userProfile: any;

  categories = Category.categories;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private barcodeScanner: BarcodeScanner,
    public platform: Platform,
    private productDbProvider: ProductDbProvider) {

    // use passed category, if available
    let category = this.navParams.get('category');
    if (category != null) {
      this.category = category;
    }
    else {
      this.category = Category.categories[0];
    }

    firebase.auth().onAuthStateChanged(user => {
      console.log("User : ", user);
      if (user) {
        this.userProfile = user;
      } else {
        this.userProfile = null;
      }
      this.base64Photo = "1";
      // Creating a new product
      console.log("Creating a new product");
      this.product = new Product(Uuid.v4(),
        '', '', '', this.category.id, null,
        '', null, '', '', '', '', new Reminder(), null,
        (this.userProfile ? this.userProfile.uid : ''), 1);
      console.log("product", this.product);
    });
    this.userProfile = this.navParams.get('user');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewWarrantyPage');

    if (!this.platform.is('cordova')) {
      // running on device/emulator
      console.log("No cordova, DEV mode. Mocking barcode");
      this.product.barcode = '1234567890';
    } else {
      // running in dev mode
      console.log('running on device/emulator');
      this.barcodeScanner.scan().then((barcodeData) => {
        // Success! Barcode data is here
        console.log("barcode: ", barcodeData.text);
        this.product.barcode = barcodeData.text;
      }, (err) => {
        // An error occurred
        console.log("Error scanning barcode: ", err);
      });
    }
  }

  addWarranty() {
    console.log("Persisting product", this.product);
    console.log("product img-", this.product.srcImage);
    this.productDbProvider.put(this.product)
      .then(r => {
        console.log('Product persisted', this.product);
        let category = Category.findById(this.product.categoryId);
        category.addProduct(this.product);
        if (this.product.srcImage != null && this.product.srcImage != '') {
          ImageUtil.getBase64ImageFromUrl(this.product.srcImage).then(dataUrl => {
            this.productDbProvider.addProductPhoto(this.product, dataUrl).then(res => {
              console.log("Product Image persisted in db succesfully!")
            });
          });
        } else {
          this.product.srcImage = "assets/images/product.png";
        }
        this.navCtrl.push(AddInvoicePage, { product: this.product });
      }).catch(err => console.error("Could not persist the invoice", err));
  }
}
