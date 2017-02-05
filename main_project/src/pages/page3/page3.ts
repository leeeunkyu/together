import { Component } from '@angular/core';
import { Myprovider } from '../../providers/myprovider'
import { Push, Vibration, Toast, LocalNotifications } from 'ionic-native';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { Calendar } from 'ionic-native';
import { CalendarPage } from '../calendar/calendar';
import { ContactPage } from '../contact/contact';
import { Contacts, Contact, ContactField, ContactName } from 'ionic-native';
@Component({
  selector: 'page3',
  templateUrl: 'page3.html'
})
export class Page3 {
  citylsit=["seoul","busan","chuncheon","jeonju","Daegu","ulsan","jeju"];
  i;
  weatherList = [];
  a;
  cnt:number;
  bestresult=[];
  end;
  start;
  snum:number;
  enum:number;
  etc:string;
  contactlist=[];
  constructor(public navCtrl: NavController, public weather : Myprovider,public modalCtrl : ModalController) {
    this.cnt=0;
  }
  goNewView(){
  this.recommend();
}
  recommend(){
    for(this.i=0;this.i<7;this.i++){
      this.getWeather(this.citylsit[this.i],"kr");
    }
  }
  getWeather( city: string, country:string ) {
  this.weather.getWeatherByCity(city, "kr")
  .map( data => data.json() )
  .subscribe(
    data=> {
      this.weatherList.push(data);
      console.log(this.weatherList);
      console.log(this.weatherList[0].dt);
      this.cnt++;
      if(this.cnt==7){
        this.bestcity();
        console.log("호출");
      }
    });
    console.log("test2");
    console.log(this.weatherList);
  }
  bestcity(){
    console.log("test3");
    console.log(this.weatherList[0].main.temp);
    //console.log(this.weatherList[0].dt);
    for(this.a=0;this.a<6;this.a++){
      if(this.weatherList[this.a].main.temp>this.weatherList[this.a+1].main.temp)
      {
        this.bestresult=this.weatherList[this.a];
      }
      else{
        this.bestresult=this.weatherList[this.a+1];
      }
    }
        console.log(this.bestresult);
  }
  goNewView2(){
    let m = this.modalCtrl.create(CalendarPage);
    m.onDidDismiss( (data) => {
      this.start=new Date(data.year,data.month-1,data.day,18,0,0,0);

      data.day=parseInt(data.day)+parseInt(data.plus);

      console.log(data.day);
      this.end=new Date(data.year,data.month-1,data.day,18,0,0,0);
      Calendar.createCalendar('test용').then(
        (msg) => {},
        (err) => { console.log(err); }
      );
     Calendar.createEvent('투게더테스트',data.city,"테스트용",this.start,this.end);
     Toast.show("날짜가 등록되었습니다.", 'long', 'center').subscribe(
     toast => {
       console.log(toast);
     }
     );
     this.etc="recommend";
     Vibration.vibrate(1000);
     })
    m.present();
  }
  goNewView3(){
    let m2 = this.modalCtrl.create(ContactPage);
    m2.onDidDismiss( (data) => {
      let contact: Contact = Contacts.create();
      contact.name = new ContactName(null, data.name);
      contact.phoneNumbers = [new ContactField('mobile', data.phonenumber)];
      contact.save().then(
        () => console.log('Contact saved!', contact),
        (error: any) => console.error('Error saving contact.', error)
      );
     this.etc="recommend";
   });
    m2.present();
  }
}
