import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Product } from "../../model/Product";
import { ProductDbProvider } from "../product-db/product-db";
import { Platform } from "ionic-angular";
import { Camera, CameraOptions } from "@ionic-native/camera";

/*
  Generated class for the InvoicePhotoProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class InvoicePhotoProvider {

  constructor(private camera: Camera,
    public platform: Platform,
    private productDbProvider: ProductDbProvider) {
    console.log('Hello InvoicePhotoProvider Provider');
  }

  public addInvoicePhoto(product: Product): Promise<Boolean> {
    console.log("addInvoice");

    if (!this.platform.is('cordova')) {
      // running on device/emulator
      console.log("No cordova, cannot take any photos");

      return Promise.resolve(true);
    } else {
      const options: CameraOptions = {
        quality: 10,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
      }

      return this.camera.getPicture(options)
        .then((imageData) => {
          return this.productDbProvider.addInvoicePhoto(product._id, product._rev, imageData)
            .then(r => {
              return true;
            });
        });
    }
  }

  public addProductPhoto(product: Product): Promise<Boolean> {
    console.log("addProduct photo");

    if (!this.platform.is('cordova')) {
      // running on device/emulator
      console.log("No cordova, cannot take any photos");

      return Promise.resolve(true);
    } else {
      const options: CameraOptions = {
        quality: 10,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
      }

      return this.camera.getPicture(options)
        .then((imageData) => {
          return this.productDbProvider.addProductPhoto(product, imageData)
            .then(r => {
              return true;
            });
        });
    }
  }

}
