import { Injectable, EventEmitter } from '@angular/core';
import 'rxjs/add/operator/map';
import PouchDB from 'pouchdb';
import { File } from '@ionic-native/file';
import { Platform } from "ionic-angular";

/*
  Generated class for the UserDbProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class UserDbProvider {
    private isInstantiated: boolean;
    private database: any;
    private listener: EventEmitter<any> = new EventEmitter();


    constructor(private file: File, private platform: Platform) {
        if (!this.isInstantiated) {
            this.database = new PouchDB("user");
            this.isInstantiated = true;
        }
        else {
            this.database.destroy();
        }
    }

    public fetch() {
        return this.database.allDocs({ include_docs: true });
    }

    public get(id: string) {
        return this.database.get(id);
    }

    public put(document: any) {
        return new Promise((resolve, reject) => {
            if (!this.platform.is('cordova')) {
                return this.putToDB(document);
            }
            else {
                return this.file.createDir(this.file.dataDirectory, 'user', true)
                    .then(userDir => {
                        console.log("Directory ", this.file.dataDirectory, "Document id ", document);
                        return this.file.createDir(this.file.dataDirectory + 'user', document._id, true);
                    }).then(() => {
                        return this.putToDB(document).then(res => {
                            resolve();
                        });
                    });
            }
        });
    }

    private putToDB(document: any) {
        return this.get(document._id).then(result => {
            document._rev = result._rev;
            return this.database.put(document);
        }, error => {
            if (error.status == "404") {
                console.log('persisting user: ', document);
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

    public delete(userId: string) {
        console.log('this.file.dataDirectory', this.file.dataDirectory);
        return this.file.removeRecursively(this.file.dataDirectory + 'user/', userId)
            .then(r => {
                return this.database.get(userId).then(doc => {
                    console.log('Deleting ', doc._id);
                    return this.database.remove(doc);
                });
            })
            .catch(err => console.log('error removing user: [' + userId + ']', err));
    }


}
