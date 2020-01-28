
import { Component } from '@angular/core'
import { NavController, NavParams, LoadingController } from 'ionic-angular'
import ImageSearch from 'google-images'
import { Image } from "../../model/Image"

@Component({
    selector: 'images',
    templateUrl: 'choose-image.html'
})

export class ImagesFromGoogle {
    public param;
    public returnedImages: Image[] = [];
    public flagNoFiles = false;
    public index;
    public callback;

    constructor(public navCtrl: NavController, public navParams: NavParams, private loading: LoadingController
    ) {
        this.param = navParams.get('param');
        console.log(this.param);
        if (this.param != null) {
            this.ionViewLoaded();
        }
    }

    ionViewLoaded() {
        let loader = this.loading.create({
            spinner: 'hide',
            content: 'Search for images ..'
        });
        var search = new ImageSearch("017492722026014867000:0eximjnxp4q", "AIzaSyASi27-j6s9Leapo0EBkh61ugVkiLUaLCY");
        console.log(search);

        loader.present().then(() => {
            search.search(this.param, {size:'medium'}).then(images => {
                var length = images.length >= 9 ? 9 : images.length;
                for (var i = 0; i < length; i++) {
                    var link = images[i].url;
                    this.returnedImages.push(new Image(i, link));
                }
            }).catch(error => console.log(error)).then(() => {
                loader.dismiss().then(() => {
                    this.flagNoFiles = true;
                }
                )
            });
        });
    }


    imageClick(i, row) {
        this.index = i + i * 2 + row;
        this.callback = this.navParams.get("callback")
        this.callback(this.returnedImages[this.index].src).then(() => {
            this.navCtrl.pop();
        });
    }

}