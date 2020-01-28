import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Product } from "../../model/Product";
import { File, Entry, DirectoryEntry } from "@ionic-native/file";
import { FileChooser } from "@ionic-native/file-chooser";
import { FileOpener } from "@ionic-native/file-opener";
import Mime from 'mime-types'
import { FilePath } from '@ionic-native/file-path';

/**
 * Generated class for the ProductDetailsSupportSpecs3dPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-product-details-support-specs3d',
  templateUrl: 'product-details-support-specs3d.html',
})
export class ProductDetailsSupportSpecs3dPage {
  product: Product;
  entries: Entry[];
  directoryName = "specs3d";

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private fileChooser: FileChooser,
    private file: File,
    private fileOpener: FileOpener,
    private filePath: FilePath,
    private alertCtrl: AlertController) {
    this.product = navParams.get("product");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductDetailsSupportSpecs3dPage');

    this.loadFiles();
  }

  loadFiles() {
    this.file.listDir(this.file.dataDirectory + 'product/' + this.product._id, this.directoryName)
    .then(e => {
      this.entries = e;
    })
    .catch(err => {
      console.log("Error listing product 3dPrinter Specs", err);
    });;
  }

  openFile(entry: Entry) {
    let mime = Mime.lookup(entry.name);

    this.fileOpener.open(entry.nativeURL, mime)
      .then(() => console.log('File is opened'))
      .catch(e => console.log('Error openening file', e));
  }

  deleteFile(entry: Entry) {
    let alert = this.alertCtrl.create({
      title: 'Confirm delete',
      message: 'Delete ' + entry.name + '?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Delete',
          handler: () => {
            entry.remove(() => {
              this.loadFiles();
            });
          }
        }
      ]
    });
    alert.present();
  }

  uploadFile() {
    console.log("uploadFile...");

    this.fileChooser.open()
      .then(uri => {
        let fileEntry = this.file.resolveLocalFilesystemUrl(uri);
        let filePath = this.filePath.resolveNativePath(uri);
        let dirEntry = this.file.createDir(this.file.dataDirectory, 'product', true)
          .then(de => { return this.file.createDir(this.file.dataDirectory + 'product', this.product._id, true); })
          .then(de => { return this.file.createDir(this.file.dataDirectory + 'product/' + this.product._id, this.directoryName, true) });

        Promise.all([fileEntry, filePath, dirEntry]).then(values => {

          let fileEntry = values[0];
          let filePath = values[1];
          let directoryEntry = <DirectoryEntry>values[2];

          fileEntry.copyTo(directoryEntry, filePath.split('/').pop(),
            (entry) => {
              console.info("file copied successfully", entry);
              this.loadFiles();
            },
            (err => {
              console.error("Error coping file", err);
            }));
        }).catch(err => console.error(err));
      })
      .catch(e => console.log(e));
  }
}
