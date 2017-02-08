import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

/*
  Generated class for the Calendar page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-calendar',
  templateUrl: 'calendar.html'
})
export class CalendarPage {
  //data: {city:string}={city:''};  

  data: { city: string, year: number, month: number, day: number, plus: number, title: string, note: string, type: string } = { city: '', year: 2017, month: 1, day: 1, plus: 0, title: '', note: '', type: "bacpack" };
  constructor(public navCtrl: NavController, public navParams: NavParams, public view: ViewController) {

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad CalendarPage');
  }
  select() {
    this.view.dismiss(this.data);
  }
  dismiss() {
    console.log('dismiss');
    this.view.dismiss(0);
  }
}
