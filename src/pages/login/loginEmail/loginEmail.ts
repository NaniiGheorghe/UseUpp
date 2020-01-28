import { Component } from '@angular/core';
import { User } from '../../../model/User';
import { NavController, AlertController } from 'ionic-angular';
import firebase from 'firebase';
import { UserDbProvider } from '../../../providers/user-db/user-db'
import { Camera } from '@ionic-native/camera';


@Component({
    templateUrl: 'loginEmail.html',
    selector: 'loginEmail'
})
export class LoginEmail {
    logInUsingEmail = false;
    userEmailData: any;


    constructor(private navCtrl: NavController,
        private userDbProvider: UserDbProvider,
        private camera: Camera,
        private alertController: AlertController
    ) {
        this.userEmailData = new User(null, null, null, null, null, null, null, null, null, null, null);
    }


    registerEmailUser() {
        console.log('Email - ', this.userEmailData.userEmail, 'Password - ', this.userEmailData.password);
        if (this.userEmailData.userEmail == null || this.userEmailData.password == null ||
            this.userEmailData.userEmail == "" || this.userEmailData.password == "") {
            let alert = this.alertController.create({ title: 'Create account error', message: "Please fill email and password fields" });
            alert.present();
        } else {
            firebase.auth().createUserWithEmailAndPassword(this.userEmailData.userEmail, this.userEmailData.password).then(result => {
                let user = new User(result.uid, this.userEmailData.user, this.userEmailData.userEmail, this.userEmailData.password, this.userEmailData.userPhoneNumber,
                    this.userEmailData.userCountry, this.userEmailData.userCity, this.userEmailData.userImage, "email",
                    this.userEmailData.gender, '');
                this.userDbProvider.put(user).then(res => {
                    this.navCtrl.popToRoot();
                });
            }).catch(err => {
                let alert = this.alertController.create({ title: 'Create account error', message: err.message });
                alert.present();
            });
        }
    }

    cancel() {
        this.navCtrl.popToRoot();
    }


    accessGallery() {
        this.camera.getPicture({
            sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
            destinationType: this.camera.DestinationType.DATA_URL,
            correctOrientation: true
        }).then((imageData) => {
            this.userEmailData.userImage = 'data:image/jpeg;base64,' + imageData;
        }, (err) => {
            console.log(err);
        });
    }

}