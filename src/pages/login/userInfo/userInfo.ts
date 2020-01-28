import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import firebase from 'firebase';
import { AuthProvider } from '../../../providers/auth-provider/auth-provider';
import { UserDbProvider } from '../../../providers/user-db/user-db';
import { User } from '../../../model/User';

@Component({
    templateUrl: 'userInfo.html',
    selector: 'userInfo',
    providers: []
})
export class UserInfo {
    userProfile: any = null;


    constructor(private userDbProvider: UserDbProvider,
        private navCtrl: NavController,
        private authProvider: AuthProvider) {
        this.userProfile = new User('', '', '', '', '', '', '', '', '','','');
        let user = firebase.auth().currentUser;
        console.log("User : ", user);
        if (user) {
            console.log("User uid : ", user);
            this.userDbProvider.get(user.uid).then(res => {
                console.log("User from db in userInfo is ", res);
                this.userProfile = res;
            });
        } else {
            this.userProfile = null;
        }
    }

    saveChanges() {
        console.log("Last ", this.userProfile._id);
        let user = new User(this.userProfile._id, this.userProfile.user, this.userProfile.userEmail, '', this.userProfile.userPhoneNumber,
                            this.userProfile.userCountry, this.userProfile.userCity, this.userProfile.userImage, 
                            this.userProfile.providerId ,this.userProfile.gender,this.userProfile.job);
        this.userDbProvider.put(user);
        this.navCtrl.popToRoot();
    }


    logout() {
        this.authProvider.googleLogOut();
        this.authProvider.facebookLogOut();
        firebase.auth().signOut().then(res => {
            console.log("Firebase logOut: " + JSON.stringify(res));
        }).catch(err => {
            console.log("Firebase logOut: " + JSON.stringify(err));
        });
        this.navCtrl.popToRoot();
    }
}
