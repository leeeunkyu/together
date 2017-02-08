import { Component, ElementRef, ViewChild } from '@angular/core';
import { Locations } from '../../providers/locations';
import { GoogleMaps } from '../../providers/google-maps';
import { NavController, Platform, Loading } from 'ionic-angular';
import { GoogleMapsCluster } from '../../providers/google-maps-cluster';
import { Geolocation } from 'ionic-native';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {

  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('pleaseConnect') pleaseConnect: ElementRef;

  constructor(public navCtrl: NavController, public maps: GoogleMaps, public platform: Platform,
    public locations: Locations, public mapCluster: GoogleMapsCluster, public nav: NavController) {

  }

  getCurrentLocation() {
    let loading = Loading.caller({
      content: 'Locating...'
    })

    this.navCtrl.isActive(loading);

    let options = { timeout: 10000, enableHighAccuracy: true };
    let locationObs = Observable.create(observable => {
      Geolocation.getCurrentPosition(options)
        .then(resp => {
          // let lat = resp.coords.latitude;
          // let lng = resp.coords.longitude;

          // let location = new google.maps.LatLng(lat, lng);
          //
          // observable.next(location);

          loading.dismiss();

          // return location
        },
        (err) => {
          console.log('Geolocation err: ' + err);
          loading.dismiss();
        })
    })

    return locationObs;

  }

  ionViewDidLoad() {

    this.platform.ready().then(() => {
      // let mapLoaded = this.maps.init(this.mapElement.nativeElement, this.pleaseConnect.nativeElement);
      let mapLoaded = this.maps.init(this.mapElement.nativeElement, this.pleaseConnect.nativeElement).then((map) => {
        this.mapCluster.addCluster(map);
      });


      let locationsLoaded = this.locations.load();

      Promise.all([
        mapLoaded,
        locationsLoaded
      ]).then((result) => {
        let locations = result[1];
        for (let location of locations) {
          this.maps.addMarker(location.latitude, location.longitude);
        }
      });
    });
  }



  // plus() {
  //   this.maps.addMarker(37.222511, 127.186255);
  // }
}
