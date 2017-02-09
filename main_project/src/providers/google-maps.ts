import { Injectable } from '@angular/core';
// import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Connectivity } from './connectivity';
import { Geolocation } from 'ionic-native';

declare var google;

@Injectable()
export class GoogleMaps {

    mapElement: any;
    pleaseConnect: any;
    map: any;
    mapInitialised: boolean = false;
    mapLoaded: any;
    mapLoadedObserver: any;
    markers: any = [];
    apiKey: string;
    infowin = [];
    i = 0;
    a: number;
    marker = [];
    marker2;
    temp: number = 0;
    infowins: any = [];
    infowin2;
    constructor(public connectivityService: Connectivity) {
      this.apiKey = "AIzaSyB7sPE8TM5lF2v8KAiwilvOqE3nuCzyoGk";
    }

    init(mapElement: any, pleaseConnect: any): Promise<any> {

        this.mapElement = mapElement;
        this.pleaseConnect = pleaseConnect;

        return this.loadGoogleMaps();

    }

    loadGoogleMaps(): Promise<any> {
        return new Promise((resolve) => {
            if (typeof google == "undefined" || typeof google.maps == "undefined") {
                console.log("Google maps JavaScript needs to be loaded.");
                this.disableMap();
                if (this.connectivityService.isOnline()) {
                    window['mapInit'] = () => {
                        this.initMap().then(() => {
                          resolve(true);
                        });
                        this.enableMap();
                    }
                    let script = document.createElement("script");
                    script.id = "googleMaps";
                    if (this.apiKey) {
                        script.src = 'http://maps.google.com/maps/api/js?key=' + this.apiKey + '&callback=mapInit';
                    } else {
                        script.src = 'http://maps.google.com/maps/api/js?callback=mapInit';
                    }
                    document.body.appendChild(script);
                }
            }
            else {
                if (this.connectivityService.isOnline()) {
                    this.initMap();
                    this.enableMap();
                }
                else {
                    this.disableMap();
                }
            }
            this.addConnectivityListeners();
        });
    }
    initMap(): Promise<any> {
        this.mapInitialised = true;
        return new Promise((resolve) => {
            Geolocation.getCurrentPosition().then((position) => {
                // UNCOMMENT FOR NORMAL USE
                //let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

                // let latLng = new google.maps.LatLng(40.713744, -74.009056);
                let latLng = new google.maps.LatLng(36.366168, 127.384678);
                let mapOptions = {
                    center: latLng,
                    zoom: 7,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                }

                this.map = new google.maps.Map(this.mapElement, mapOptions);
                resolve(true);

            });

        });

    }

    disableMap(): void {

        if (this.pleaseConnect) {
            this.pleaseConnect.style.display = "block";
        }

    }

    enableMap(): void {

        if (this.pleaseConnect) {
            this.pleaseConnect.style.display = "none";
        }

    }

    addConnectivityListeners(): void {

        document.addEventListener('online', () => {

            console.log("online");

            setTimeout(() => {

                if (typeof google == "undefined" || typeof google.maps == "undefined") {
                    this.loadGoogleMaps();
                }
                else {
                    if (!this.mapInitialised) {
                        this.initMap();
                    }

                    this.enableMap();
                }

            }, 2000);

        }, false);

        document.addEventListener('offline', () => {

            console.log("offline");

            this.disableMap();

        }, false);

    }
    setmap(lat: number, lng: number, data: any) {
        let loc = { lat: lat, lng: lng };
        this.marker2 = new google.maps.Marker({
            map: this.map,
            animation: google.maps.Animation.DROP,
            position: loc
        });
        this.infowin2 = new google.maps.InfoWindow({
            content: ` <ion-grid>
             <ion-row>
                 <p>`+ data.location + `</p>
             </ion-row>
             <ion-row>
                 <p>`+ data.memo + `</p>
             </ion-row>
           </ion-grid>`

        });
        this.map.setCenter(loc);
        this.map.setZoom(15);
        this.marker2.setPosition(loc);
        this.infowin2.open(this.map, this.marker2);

    }
    addMarker(lat: number, lng: number, data: any): void {

        let latLng = new google.maps.LatLng(lat, lng);
        this.marker[this.i] = new google.maps.Marker({
            map: this.map,
            animation: google.maps.Animation.DROP,
            position: latLng,
            label: '' + this.i
        });
        console.log(this.i);
        console.log(lat);

        this.markers.push(this.marker);
        let contentstring = `
    <ion-grid>
      <ion-row>
          <p>`+ data[this.i].location + `</p>
      </ion-row>
      <ion-row>
          <p>`+ data[this.i].memo + `</p>
      </ion-row>
    </ion-grid>`

        this.infowin[this.i] = new google.maps.InfoWindow({
            content: `
          <ion-grid>
            <ion-row>
                <p>`+ data[this.i].location + `</p>
            </ion-row>
            <ion-row>
                <p>`+ data[this.i].memo + `</p>
            </ion-row>
          </ion-grid>`

        });
        this.infowins.push(this.infowin);
        this.infowin[this.i].open(this.map, this.marker[this.i]);

        this.marker[this.i].addListener('click', (e) => {
        });

        console.log(this.infowins);
        console.log(this.markers);
        //this.infowin[].open(this.map,this.marker);
        //  this.infowin.open(this.map, marker);
        // for(this.a=0;this.a<=this.i;this.a++){
        // console.log(this.a);
        //  google.maps.event.addListener(this.marker[this.i], 'click', () => {
        //    console.log("리스너");
        //
        //    this.infowin.open(this.map, this.marker[this.i]);
        //   });
        //

        this.i++;
        //  console.log(this.i);

        // console.log(this.marker.toString.name);
        // console.log(this.i);

    }
    test(n: number) {
        // console.log(n);

    }


}
