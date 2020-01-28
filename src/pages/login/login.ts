import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import firebase from 'firebase';
import { AuthProvider } from '../../providers/auth-provider/auth-provider';
import { UserDbProvider } from '../../providers/user-db/user-db';
import { User } from '../../model/User';
import { LoginEmail } from '../login/loginEmail/loginEmail'




@Component({
    templateUrl: 'login.html',
    selector: 'login',
    providers: [AuthProvider, UserDbProvider]
})
export class Login {
    userEmailData: any = null;
    userProfile: any = null;

    constructor(public navCtrl: NavController,
        private authProvider: AuthProvider,
        private userDbProvider: UserDbProvider,
        private alertController: AlertController
    ) {
        this.userEmailData = new User('', '', '', '', '', '', '', '', '','','');
    }

    googleLogin(): void {
        this.logout();
        this.authProvider.googleLogIn().then(result => {
            console.log("User login google : ", result.user);
            let user = new User(result.user.uid, result.user.displayName, result.user.providerData[0].email, '', '', '', '', result.user.photoURL, result.user.providerData[0].providerId,'','');
            this.userDbProvider.put(user).then(res => {
                console.log("Succes : ", res);
            }).catch(err => {
                console.log("Error : ", err);
            });
            this.navCtrl.popToRoot();
        });
    }

    facebookLogin() {
        this.logout();
        this.authProvider.facebookLogin().then(result => {
            console.log("Promise is")
            let user = new User(result.user.uid, result.user.displayName, result.user.providerData[0].email, '', '', '', '', result.user.photoURL, result.user.providerData[0].providerId,'','');
            this.userDbProvider.put(user)
            this.navCtrl.popToRoot();
        });
    }


    logInUsingEmail() {
        if (this.userEmailData.email == null || this.userEmailData.password == null) {
            let alert = this.alertController.create({ title: 'Authentication error', message: "Please fill email and password fields" });
            alert.present();
        } else {
            firebase.auth().signInWithEmailAndPassword(this.userEmailData.email, this.userEmailData.password).then(res => {
                this.navCtrl.popToRoot();
            }).catch(err => {
                let alert = this.alertController.create({ title: 'Authentication error', message: err.message });
                alert.present();
            });
        }
    }

    createNewAccount() {
        this.navCtrl.push(LoginEmail);
    }

    logout() {
        this.authProvider.googleLogOut();
        this.authProvider.facebookLogOut();
        firebase.auth().signOut().then(res => {
            console.log("Firebase logOut: " + JSON.stringify(res));
        }).catch(err => {
            console.log("Firebase logOut: " + JSON.stringify(err));
        });
    }
}