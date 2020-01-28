import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions
} from '@ionic-native/google-maps';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { NativeGeocoder, NativeGeocoderReverseResult } from '@ionic-native/native-geocoder';
import { LocationAccuracy } from '@ionic-native/location-accuracy';

/**
 * Generated class for the ProductDetailsSupportServcentersPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-product-details-support-servcenters',
  templateUrl: 'product-details-support-servcenters.html',
})
export class ProductDetailsSupportServcentersPage {

  map: GoogleMap;
  mapElement: HTMLElement;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public geolocation: Geolocation,
    public geocoder: NativeGeocoder,
    public locac: LocationAccuracy,
    private googleMaps: GoogleMaps) {
  }

  ngAfterViewInit() {
    console.log('ngAfterViewInit ProductDetailsSupportServcentersPage');
    this.loadMap();
  }


  loadMap() {
    this.mapElement = document.getElementById('map');
    console.log("map element", this.mapElement);

    this.geolocate().then(position => {
      let mapOptions: GoogleMapOptions = {
        camera: {
          target: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          },
          zoom: 10
        }
      };
      this.map = this.googleMaps.create(this.mapElement, mapOptions);

      // Wait the MAP_READY before using any methods.

      console.log("We got position", position);
      this.map.one(GoogleMapsEvent.MAP_READY)
        .then(() => {
          console.log('Map is ready!');

          this.map.addMarker({
            title: 'Ionic',
            icon: 'red',
            animation: 'DROP',
            position: {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            }
          }).then(marker => {
            console.log("Marker", marker);
            marker.on(GoogleMapsEvent.MARKER_CLICK)
              .subscribe(() => {
                alert('Your location');
              });
          });


          for (var i = 0; i < 20; i++) {
            let randomLat: any = (Math.random() * ((position.coords.latitude - 0.1) - (position.coords.latitude + 0.1)) + (position.coords.latitude + 0.1)).toFixed(19);
            let randomLon: any = (Math.random() * ((position.coords.longitude - 0.1) - (position.coords.longitude + 0.1)) + (position.coords.longitude + 0.1)).toFixed(19);
            console.log("random - ", randomLat, randomLon);

            this.map.addMarker({
              title: 'Service Center',
              icon: 'blue',
              animation: 'DROP',
              position: {
                lat: randomLat,
                lng: randomLon
              }
            })

          }

        });
    });
  }


  geolocate(): any {
    return new Promise((resolve, reject) => {
      console.log("Geolocation");
      let options = {
        enableHighAccuracy: true
      };
      this.locac.canRequest().then((res: boolean) => {
        if (res) {
          console.log("Geolocation is enabled");
          this.locac.request(this.locac.REQUEST_PRIORITY_HIGH_ACCURACY).then(() => {
            this.geolocation.getCurrentPosition(options).then((position: Geoposition) => {
              console.log("Position is", position);
              resolve(position);
            }).catch((err) => {
              console.error(err);
            })
          }, (error) => {
            reject("Could not get geolocation")
          })
        } else {
          this.geolocation.getCurrentPosition(options).then((position: Geoposition) => {
            this.getcountry(position);
          }).catch((err) => {
            console.error(err);
          })
        }
      }).catch(err => {
        reject("Could not request geolocation");
      })
    });
  }

  getcountry(pos) {
    this.geocoder.reverseGeocode(pos.coords.latitude, pos.coords.longitude).then((res: NativeGeocoderReverseResult[]) => {
      console.log("Country = ", res);
    })
  }

}