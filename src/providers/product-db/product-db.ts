import { Injectable, EventEmitter } from '@angular/core';
import 'rxjs/add/operator/map';
import PouchDB from 'pouchdb';
import { File } from '@ionic-native/file';
import { Product } from "../../model/Product";
import { Platform } from "ionic-angular";
import { ReminderProvider } from "../reminder/reminder";
import { User } from "firebase";

/*
  Generated class for the ProductDbProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ProductDbProvider {
  private isInstantiated: boolean;
  private database: any;
  private listener: EventEmitter<any> = new EventEmitter();


  constructor(private file: File, private reminderProvider: ReminderProvider, private platform: Platform) {
    if (!this.isInstantiated) {
      this.database = new PouchDB("product");
      this.isInstantiated = true;
    }
  }

  public loadDatabaseForUser(user: User) {
    if (user != null)
      this.database = new PouchDB("product-" + user.uid);
    else {
      this.database = new PouchDB("product");
    }
  }

  public fetch() {
    return this.database.allDocs({ include_docs: true });
  }

  public get(id: string) {
    return this.database.get(id);
  }

  public getById(id: string): Promise<Product> {
    return this.database.get(id).then(doc => {
      return Product.parse(doc);
    });
  }

  public put(document: any) {
    if (!this.platform.is('cordova')) {
      return this.putToDB(document);
    }
    else {
      return this.file.createDir(this.file.dataDirectory, 'product', true)
        .then(productsDir => {
          return this.file.createDir(this.file.dataDirectory + 'product', document._id, true);
        }).then(() => {
          let aa = this.putToDB(document);
          this.fetch().then(a => console.log("fetch from db", a));
          return aa;
        });
    }
  }

  public dissmissReminder(product: Product) {
    product.reminder.dismissed = true;
    this.putToDB(product);
  }

  private putToDB(document: any) {
    return this.get(document._id).then(result => {
      document._rev = result._rev;
      return this.database.put(document);
    }, error => {
      if (error.status == "404") {
        console.log('persisting product: ', document);
        return this.database.put(document);
      } else {
        return new Promise((resolve, reject) => {
          reject(error);
        });
      }
    });
  }

  public sync(remote: string) {
    let remoteDatabase = new PouchDB(remote);
    this.database.sync(remoteDatabase, {
      live: true
    }).on('change', change => {
      this.listener.emit(change);
    }).on('error', error => {
      console.error(JSON.stringify(error));
    });
  }

  public getChangeListener() {
    return this.listener;
  }

  public addInvoicePhoto(productId: string, revision: string, base64String: string) {
    console.log('addInvoicePhoto', productId);

    return this.file.createDir(this.file.dataDirectory, 'product', true)
      .then(productsDir => {
        return this.file.createDir(this.file.dataDirectory + 'product', productId, true);
      })
      .then(productDir => {
        return this.file.writeFile(this.file.dataDirectory + 'product/' + productId, 'invoice.png', base64String, { replace: true });
      })
      .then(f => console.log('image saved', f))
      .catch(err => console.log('Error saving invoice', err));
  }

  public addProductPhoto(product: Product,  base64String: string) {
    console.log('addProductPhoto', product);

    return this.file.createDir(this.file.dataDirectory, 'product', true)
      .then(productsDir => {
        return this.file.createDir(this.file.dataDirectory + 'product', product._id, true);
      })
      .then(productDir => {
        return this.file.writeFile(this.file.dataDirectory + 'product/' + product._id, 'photo.png', base64String, { replace: true });
      })
      .then(f => console.log('image saved', f))
      .catch(err => console.log('Error', err));
  }

  public delete(product: Product) {
    console.log('Deleting product', product);
    this.file.checkDir(this.file.dataDirectory + 'product/', product._id).then(result => {
      if (result.valueOf() == true) {
        this.file.removeRecursively(this.file.dataDirectory + 'product/', product._id)
          .catch(err => console.warn("Product folder couldn't be removed"));
      }
    }).catch(err => console.error("AAAAAAAAAA", err));

    this.reminderProvider.removeReminderForProduct(product);

    return this.database.get(product._id).then(doc => {
      console.log('Deleting ', doc._id);
      return this.database.remove(doc);
    });
  }

  public getInvoicePhoto(productId: string) {
    return this.file.readAsText(this.file.dataDirectory + 'product/' + productId, 'invoice.png')
      .then(img => {
        return 'data:image/png;base64,' + img
      });
  }

  public getProductPhoto(productId: string) {
    return this.file.readAsText(this.file.dataDirectory + 'product/' + productId, 'photo.png')
      .then(img => {
        return 'data:image/png;base64,' + img
      });
  }

}
