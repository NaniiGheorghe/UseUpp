import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Camera } from '@ionic-native/camera';
import { GooglePlus } from '@ionic-native/google-plus';
import { AuthProvider } from '../providers/auth-provider/auth-provider';
import { Facebook } from '@ionic-native/facebook';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { FileChooser } from '@ionic-native/file-chooser';
import { FileOpener } from '@ionic-native/file-opener';
import { FilePath } from '@ionic-native/file-path';

import { UseUpp } from './app.component';
import { MyProductsPage } from "../pages/my-products/my-products";
import { NewWarrantyPage } from "../pages/new-warranty/new-warranty";
import { SettingsPage } from "../pages/settings/settings";
import { FeedbackPage } from "../pages/feedback/feedback";
import { UserGuidePage } from "../pages/user-guide/user-guide";
import { BarcodeScanner } from "@ionic-native/barcode-scanner";
import { ProductDbProvider } from '../providers/product-db/product-db';
import { UserDbProvider } from '../providers/user-db/user-db'
import { AddInvoicePage } from "../pages/add-invoice/add-invoice";
import { WarrantyDetailsPage } from "../pages/warranty-details/warranty-details";
import { ProductDetailsPage } from "../pages/product-details/product-details";
import { ProductDetailsPopoverPage } from "../pages/product-details-popover/product-details-popover";
import { SafeHtmlPipe } from '../pipes/safe-html/safe-html';
import { File } from '@ionic-native/file';
import { CategoryProductsPage } from "../pages/category-products/category-products";
import { ProgressBarComponent } from "../components/progress-bar/progress-bar";
import { ImagesFromGoogle } from '../pages/choose-image/choose-image';
import { Login } from '../pages/login/login';
import { LoginEmail } from '../pages/login/loginEmail/loginEmail'
import { UserInfo } from '../pages/login/userInfo/userInfo'
import { ProductDetailsPurchasePage } from "../pages/product-details-purchase/product-details-purchase";
import { ProductDetailsSupportPage } from "../pages/product-details-support/product-details-support";
import { ProductDetailsWarrantyPage } from "../pages/product-details-warranty/product-details-warranty";
import { InvoicePhotoProvider } from '../providers/invoice-photo/invoice-photo';
import { ProductDetailsSupportServcentersPage } from "../pages/product-details-support-servcenters/product-details-support-servcenters";
import { ProductDetailsSupportUsermanualPage } from "../pages/product-details-support-usermanual/product-details-support-usermanual";
import { ProductDetailsSupportVideosPage } from "../pages/product-details-support-videos/product-details-support-videos";
import { ProductDetailsSupportPurcheseSparePart } from "../pages/product-details-support-purchaseSparePart/product-details-support-purchaseSparePart";
import { ProductDetailsSupportPurcheseSparePartDetails } from '../pages/product-details-support-purchaseSparePart-details/product-details-support-purchaseSparePart-details'

import { ReminderProvider } from '../providers/reminder/reminder';
import { WarrantyStatusComponent } from "../components/warranty-status/warranty-status";
import { ProductDetailsSupportSpecs3dPage } from "../pages/product-details-support-specs3d/product-details-support-specs3d";
import { EditProductPage } from "../pages/edit-product/edit-product";
import { EditProductComponent } from "../components/edit-product/edit-product";
import { WarrantyRequestPage } from "../pages/warranty-request/warranty-request";
import { ProductFeedbackPage } from '../pages/product-feedback/product-feedback';

import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder } from '@ionic-native/native-geocoder';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { GoogleMaps } from '@ionic-native/google-maps';

import { SuperTabsModule } from 'ionic2-super-tabs';

@NgModule({
  declarations: [
    UseUpp,
    MyProductsPage,
    CategoryProductsPage,
    NewWarrantyPage,
    SettingsPage,
    FeedbackPage,
    UserGuidePage,
    AddInvoicePage,
    WarrantyDetailsPage,
    ProductDetailsPage,
    ProductDetailsPopoverPage,
    ProductDetailsPurchasePage,
    ProductDetailsSupportPage,
    ProductDetailsSupportServcentersPage,
    ProductDetailsSupportUsermanualPage,
    ProductDetailsSupportVideosPage,
    ProductDetailsSupportSpecs3dPage,
    ProductDetailsWarrantyPage,
    ProductFeedbackPage,
    WarrantyRequestPage,
    EditProductPage,
    ProductDetailsSupportPurcheseSparePart,
    ProductDetailsSupportPurcheseSparePartDetails,
    SafeHtmlPipe,
    ImagesFromGoogle,
    ProgressBarComponent,
    WarrantyStatusComponent,
    EditProductComponent,
    Login,
    LoginEmail,
    UserInfo
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(UseUpp),
    SuperTabsModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    UseUpp,
    MyProductsPage,
    CategoryProductsPage,
    NewWarrantyPage,
    SettingsPage,
    FeedbackPage,
    UserGuidePage,
    AddInvoicePage,
    WarrantyDetailsPage,
    ProductDetailsPage,
    ProductDetailsPopoverPage,
    ProductDetailsPurchasePage,
    ProductDetailsSupportPage,
    ProductDetailsSupportServcentersPage,
    ProductDetailsSupportUsermanualPage,
    ProductDetailsSupportVideosPage,
    ProductDetailsSupportSpecs3dPage,
    ProductDetailsWarrantyPage,
    ProductFeedbackPage,
    WarrantyRequestPage,
    EditProductPage,
    ProductDetailsSupportPurcheseSparePart,
    ProductDetailsSupportPurcheseSparePartDetails,
    ImagesFromGoogle,
    Login,
    LoginEmail,
    UserInfo
  ],
  providers: [
    StatusBar,
    Camera,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    BarcodeScanner,
    ProductDbProvider,
    File,
    GooglePlus,
    AuthProvider,
    Facebook, ,
    LocalNotifications,
    FileChooser,
    FileOpener,
    FilePath,
    InvoicePhotoProvider,
    UserDbProvider,
    ReminderProvider,
    Geolocation,
    NativeGeocoder,
    LocationAccuracy,
    GoogleMaps
  ]
})
export class AppModule { }
