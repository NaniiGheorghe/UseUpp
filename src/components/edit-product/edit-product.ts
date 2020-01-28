import { Component, Input } from '@angular/core';
import { Category } from "../../model/Category";
import { CurrencyUtil } from "../../util/CurrencyUtil";
import { NavController, NavParams } from "ionic-angular";
import { ImageUtil } from "../../util/ImageUtil";
import { ImagesFromGoogle } from "../../pages/choose-image/choose-image";

/**
 * Generated class for the EditProductComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'edit-product',
  templateUrl: 'edit-product.html'
})
export class EditProductComponent {
  srcImage: any = null;
  @Input('product') product;
  @Input('showProductDetails') showProductDetails = true;
  @Input('showWarrantyDetails') showWarrantyDetails = true;
  @Input('base64Photo') base64Photo;

  categories = Category.categories;
  currencies = Object.keys(CurrencyUtil.currencies);

  constructor(public navCtrl: NavController,
    public navParams: NavParams) {
    console.log('Hello EditProductComponent Component', this.product);
  }

  searchImage() {
    if (this.product.name.length >= 3 && this.product.name != null) {
      ImageUtil.searchImage(this.product.name, this.product.brand)
        .then(imgUrl => {
          console.log('Image found for product [' + this.product.name + '], brand [' + this.product.brand + ']. URL: ' + imgUrl);
          this.product.srcImage = imgUrl;
        })
        .catch(err => {
          console.error('Error finding the image or conveting it to base64', err)
          this.srcImage = "assets/images/product.png";
          this.base64Photo = ImageUtil.defaultProductPhoto();
        });
    }
  }

  goToSearchImagePage() {
    var param = this.product.name + ' ' + this.product.brand;
    var self = this;
    this.navCtrl.push(ImagesFromGoogle, {
      param: param, callback: function (_params) {
        console.log(_params);
        return new Promise((resolve, reject) => {
          self.product.srcImage = _params;
          resolve();
        });
      }
    })
  }
}
