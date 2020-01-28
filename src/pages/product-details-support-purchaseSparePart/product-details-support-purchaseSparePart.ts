import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProductDetailsSupportPurcheseSparePartDetails } from '../product-details-support-purchaseSparePart-details/product-details-support-purchaseSparePart-details'

/**
 * Generated class for the ProductDetailsSupportServcentersPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'product-details-support-purchaseSparePart',
  templateUrl: 'product-details-support-purchaseSparePart.html',
})
export class ProductDetailsSupportPurcheseSparePart {
  sparePartsarray = [
    { name: 'LCD Display+Touch', brand: 'Apple', price: '40$', srcImage: "assets/images/sparePart/1.jpg" },
    { name: 'USB-C 3.1 Type C', brand: 'Nexus', price: '9.99$', srcImage: 'assets/images/sparePart/2.jpg' },
    { name: 'Battery Door', brand: 'Samsung', price: '15$', srcImage: 'assets/images/sparePart/3.jpg' },
    { name: 'Battery', brand: 'Samsung', price: '5$', srcImage: 'assets/images/sparePart/4.jpg' },
    { name: 'IPartsBuy', brand: 'Samsung ', price: '75$', srcImage: 'assets/images/sparePart/5.jpg' },
    { name: 'Screen Replacement', brand: 'Samsung', price: '6$', srcImage: 'assets/images/sparePart/6.jpg' },
    { name: 'OH Micro Sim Card', brand: 'Sony Xperia', price: '12$', srcImage: 'assets/images/sparePart/7.jpg' },
    { name: 'Aluminum Case', brand: 'Apple ', price: '1$', srcImage: 'assets/images/sparePart/8.jpg' }
  ]

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductDetailsSupportPurcheseSparePart');
  }

  spareParts() {
    return this.sparePartsarray;
  }

  sparePartClick(sparePart) {
    console.log("Spare part clicked - " , sparePart)
    this.navCtrl.push(ProductDetailsSupportPurcheseSparePartDetails, { sparePart: sparePart });
  }

}
