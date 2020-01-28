import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import firebase from 'firebase';

import { MyProductsPage } from "../pages/my-products/my-products";
import { NewWarrantyPage } from "../pages/new-warranty/new-warranty";
import { SettingsPage } from "../pages/settings/settings";
import { FeedbackPage } from "../pages/feedback/feedback";
import { UserGuidePage } from "../pages/user-guide/user-guide";

@Component({
  templateUrl: 'app.html'
})
export class UseUpp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = MyProductsPage;
  menuItems: Array<{ title: string, icon: string, action: any }>;

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public plt: Platform
  ) {
    this.initializeApp();
    this.initializeUser();
    // set our app's pages
    this.menuItems = [
      { title: 'My products', icon: 'albums', action: () => this.openPage(MyProductsPage) },
      { title: 'Add a new warranty', icon: 'add-circle', action: () => this.openPage(NewWarrantyPage) },
      { title: 'Settings', icon: 'settings', action: () => this.openPage(SettingsPage) },
      { title: 'Send us feedback', icon: 'text', action: () => this.openPage(FeedbackPage) },
      { title: 'How does it work', icon: 'book', action: () => this.openPage(UserGuidePage) },
      { title: 'Rate us', icon: 'star', action: () => this.rateApp() },
      { title: 'Share', icon: 'share', action: () => this.shareApp() }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  executeAction(menuItem) {
    menuItem.action();
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    if (page == MyProductsPage)
      this.nav.popToRoot();
    else 
      this.nav.push(page);
  }

  rateApp() {
    // this.plt.ready().then(res => {
    //   this.appRate.preferences.storeAppURL.android = 'market://details?id=io.ionic.starter';
    //   this.appRate.navigateToAppStore();
    // });
  }

  shareApp() {
    console.log('Propose methods for sharing the application with others');
  }

  initializeUser() {
    var config = {
      apiKey: "AIzaSyAPo53h8O5yZyZYlk9j42X9LUaoAawuNtc",
      authDomain: "userapp-174523.firebaseapp.com"
    };
    firebase.initializeApp(config);
  }
}

