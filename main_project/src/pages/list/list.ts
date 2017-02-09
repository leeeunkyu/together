import { Component } from '@angular/core';
import { NavController, NavParams, AlertController  } from 'ionic-angular';
import { GoogleMaps } from '../../providers/google-maps';
import {Myprovider} from '../../providers/myprovider';
import { MapPage } from '../map/map';

/*
  Generated class for the List page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  // maplist:{location:string,memo:string}={location:'',memo:''};
  maplist = []
  constructor(public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, public maps: GoogleMaps, public mypro: Myprovider) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListPage');
  }
  showprompt() {
    let prompt = this.alertCtrl.create({
      title: '장소등록',
      message: "놀러간 장소를 등록해주시고 간단한 메모를 남기실수 있습니다.",
      inputs: [
        {
          name: 'location',
          placeholder: '장소'
        },
        {
          name: 'memo',
          placeholder: '메모'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.maplist.push({
              location: data.location,
              location2: data.location,
              location3: data.location,
              memo: data.memo
            });
            this.addmaplist(data.location, data.memo);

            console.log(data);
            console.log(this.maplist);
          }
        }
      ]
    });
    prompt.present();
  }
  addmaplist(name: string, memo: string) {
    this.mypro.getWeatherByCity(name, "kr")
      .map(data => data.json())
      .subscribe(
      data => {
        console.log("test");
        console.log(data);
        this.maps.addMarker(data.coord.lat, data.coord.lon, this.maplist);
      });
  }
  searchmap(m: any) {
    this.mypro.getWeatherByCity(m.location, "kr")
      .map(data => data.json())
      .subscribe(
      data => {
        this.maps.setmap(data.coord.lat, data.coord.lon, m);
        //
      });
    this.navCtrl.push(MapPage);
  }
}
