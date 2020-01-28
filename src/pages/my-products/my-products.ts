import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { NewWarrantyPage } from "../new-warranty/new-warranty";
import { Product } from "../../model/Product";
import { ProductDbProvider } from "../../providers/product-db/product-db";
import { Category } from "../../model/Category";
import { CategoryProductsPage } from "../category-products/category-products";
import { Login } from '../login/login'
import firebase from 'firebase';
import { UserDbProvider } from '../../providers/user-db/user-db'
import { UserInfo } from '../login/userInfo/userInfo'
import { ReminderProvider } from "../../providers/reminder/reminder";
import { ProductDetailsPage } from "../product-details/product-details";
import { LocalNotifications } from '@ionic-native/local-notifications';


/** 
 * Generated class for the MyProductsPage page.
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 * 
 * */

@Component({
  selector: 'page-my-products',
  templateUrl: 'my-products.html',
})
export class MyProductsPage {
  userProfile: any = null;
  countOfProductsPerUser = 0;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private productDbProvider: ProductDbProvider,
    public plt: Platform,
    private userDbProvider: UserDbProvider,
    private localNotifications: LocalNotifications,
    private reminderProvider: ReminderProvider) {
    this.plt.ready().then((readySource) => {
      this.localNotifications.on('click', (notification, state) => {
        let data = JSON.parse(notification.data);

        if (data.productId != null) {
          productDbProvider.getById(data.productId).then(product => {
            this.navCtrl.push(ProductDetailsPage, { product: product });

            productDbProvider.dissmissReminder(product);
          });
        }
      })
    });
  }

  ionViewDidLoad() {
    this.plt.ready().then((readySource) => {
      console.log('Platform ready from', readySource);
    });
  }

  ionViewWillEnter() {
    console.log("ionViewWillEnter from MyProductsPage");
    // necessary in order to reload the data when poping back to root
    this.loadUserInformation().then(res => this.loadData());
  }

  private loadUserInformation() {
    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged(user => {
        console.log("User : ", user);
        if (user) {
          // load user databse
          console.info('Loading database for user', user);
          this.productDbProvider.loadDatabaseForUser(user);
          // load user from database
          this.userDbProvider.get(user.uid).then(res => {
            console.log("User from db in myproducs is ", res);
            this.userProfile = res;
            resolve();
          });
        } else {
          this.productDbProvider.loadDatabaseForUser(null);
          this.userProfile = null;
          resolve();
        }
      });
    });
  }

  private loadData() {
    Category.reset();

    this.productDbProvider.fetch().then(result => {
      console.log("All products:", result);
      this.countOfProductsPerUser = result.rows.length;
      for (let i = 0; i < result.rows.length; i++) {
        let doc = result.rows[i].doc;

        let product = Product.parse(doc);

        Category.findById(product.categoryId).addProduct(product);

        this.reminderProvider.setReminderFor(product);
      }
    }, error => {
      console.error(error);
    });
  }

  categoryClick(category) {
    this.navCtrl.push(CategoryProductsPage, { category: category });
  }

  categories(): Category[] {
    return Category.categories;
  }

  newWarranty() {
    this.navCtrl.push(NewWarrantyPage, { user: this.userProfile ? this.userProfile._id : '' });
  }

  login() {
    if (firebase.auth().currentUser) {
      this.navCtrl.push(UserInfo);
    } else {
      this.navCtrl.push(Login);
    }
  }

  // rateUs() {
  //   if (this.appRate.preferences != null) {
  //     this.appRate.preferences.openStoreInApp = true;
  //     this.appRate.preferences.usesUntilPrompt = 3;
  //     this.appRate.preferences.promptAgainForEachNewVersion = false;
  //     this.appRate.preferences.storeAppURL.ios = 'io.ionic.starter';
  //     this.appRate.preferences.storeAppURL.android = 'market://details?id=io.ionic.starter';
  //     console.log("App rate : ", this.appRate.preferences);
  //     this.appRate.promptForRating(false);
  //   }
  // }
}
