import { Injectable } from '@angular/core';
import { GooglePlus } from '@ionic-native/google-plus';
import firebase from 'firebase';
import { LoadingController } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';

@Injectable()
export class AuthProvider {
    private webClientId = '1000577798406-1ulh7up9nlqmcstg9jvkrp7smc9usvl1.apps.googleusercontent.com';
    private loader;


    constructor(private googlePlus: GooglePlus,
        private loading: LoadingController,
        private facebook: Facebook) {
        this.loader = this.loading.create({
            spinner: 'hide',
            content: 'Logging in  ..'
        });
    }

    googleLogIn(): any {
        return new Promise((resolve, reject) => {
            this.googlePlus.login({
                'webClientId': this.webClientId,
                'offline': true
            }).then(res => {
                this.loader.present().then(() => {
                    var credential = firebase.auth.GoogleAuthProvider.credential(res.idToken);
                    firebase.auth().signInAndRetrieveDataWithCredential(credential)
                        .then(success => {
                            console.log("Firebase success: " + JSON.stringify(success));
                            resolve(success);
                            this.loader.dismiss();
                        }).catch(error => {
                            console.log("Firebase failure: " + JSON.stringify(error))
                        });
                });
            }).catch(err => {
                console.error("Error: ", err)
            });
        });
    }

    facebookLogin(): any {
        return new Promise((resolve, reject) => {
            this.facebook.login(['email']).then((response) => {
                this.loader.present().then(() => {
                    const facebookCredential = firebase.auth.FacebookAuthProvider
                        .credential(response.authResponse.accessToken);
                    firebase.auth().signInAndRetrieveDataWithCredential(facebookCredential)
                        .then(success => {

                            console.log("Firebase success: " + JSON.stringify(success));
                            resolve(success);
                            this.loader.dismiss();
                        }).catch(error => {
                            console.log("Firebase failure: " + JSON.stringify(error))
                        });
                });
            }).catch(err => {
                console.error("Facebook authentication: ", err)
            });
        });
    }


    googleLogOut(): any {
        this.googlePlus.logout().then(res => {
            console.log("Google logOut: " + JSON.stringify(res));
        }).catch(err => {
            console.log("Google logOut: " + JSON.stringify(err));
        });
    }

    facebookLogOut(): any {
        this.facebook.logout().then(res => {
            console.log("Facebook logOut: " + JSON.stringify(res));
        }).catch(err => {
            console.log("Facebook logOut: " + JSON.stringify(err));
        });
    }



}