import { Component } from '@angular/core';
import { Myprovider } from '../../providers/myprovider'
import { Vibration, Toast } from 'ionic-native';
import { NavController, ModalController, LoadingController } from 'ionic-angular';
import { Calendar } from 'ionic-native';
import { CalendarPage } from '../calendar/calendar';
import { ContactPage } from '../contact/contact';
import { InformationPage } from '../information/information';
import { Contacts, Contact, ContactField, ContactName } from 'ionic-native';
import { SocialSharing } from 'ionic-native';
declare var window;

@Component({
  selector: 'page3',
  templateUrl: 'page3.html'
})
export class Page3 {
  citylsit=["seoul","busan","chuncheon","jeonju","Daegu","ulsan","jeju"];
  i;
  weatherList = [];
  a;
  k;
  l;
  num;
  temp;
  goodweather=[];
  cnt:number;
  bestresult=[];
  bestindex;
  end;
  start;
  calenlist=[];
  max:number;
  snum:number;
  enum:number;
  etc:string;
  contactlist=[];
  images=[];
  constructor(public navCtrl: NavController, public weather : Myprovider,public modalCtrl : ModalController,public loadingCtrl: LoadingController) {
    this.cnt=0;
    this.max=0;
    this.num=0;
    this.images[0]="assets/flower.png";
    this.images[1]="assets/mountain.png";
    this.images[2]="assets/paris.png";
    this.images[3]="assets/sea.png";
    let loader = this.loadingCtrl.create({
    content: "기다려 주세용",
    duration: 3000
  });
  loader.present();
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
      this.cnt++;
      if(this.cnt==7){
        this.bestcity();
      }
    });
  }
  bestcity(){
    console.log(this.weatherList);

    for(this.a=0;this.a<7;this.a++){
      this.max+=parseInt(this.weatherList[this.a].main.temp);
    }
    //console.log(this.weatherList[0].dt);
    // for(this.a=0;this.a<6;this.a++){
    //   if(this.weatherList[this.a].main.temp>this.weatherList[this.a+1].main.temp)
    //   {
    //     this.bestresult=this.weatherList[this.a];
    //   }
    //   else{
    //     this.bestresult=this.weatherList[this.a+1];
    //   }
    // }
    //     console.log(this.bestresult);
        for(this.a=0;this.a<7;this.a++){
          this.bestresult[this.a]=this.weatherList[this.a].main.temp;
        }
        // console.log(this.bestresult);
        this.sort(this.bestresult,this.citylsit.length-1);
  }
  
  sort(list,high:number){
    console.log(high);
    console.log(list);
    for(this.a=0;this.a<high;this.a++){
      for(this.k=0;this.k<high-1;this.k++){
        if(list[this.k] > list[this.k+1])
        {
          this.temp=list[this.k];
          list[this.k]=list[this.k+1];
          list[this.k+1]=this.temp;
        }
      }
    }
    if(this.max/high>25){
     for(this.a=0;this.a<=high;this.a++){
      if(parseInt(this.weatherList[this.a].main.temp)==parseInt(list[0])){
          this.bestresult=this.weatherList[this.a];
      }else{
        console.log(list[0]);
        console.log(this.weatherList[this.a].main.temp);
      }
    }
    }else{
      for(this.a=0;this.a<=high;this.a++){
        if(parseInt(this.weatherList[this.a].main.temp)==parseInt(list[high])){
            this.bestresult=this.weatherList[this.a];
            console.log("!");

          }else{
            console.log("?");
            console.log(list[high]);
            console.log(this.weatherList[this.a].main.temp);
          }
        }
    }
//     this.temp=high;
//     this.l=0;
//    console.log(list);
//    console.log(this.weatherList[1].main.temp);
// for(;this.temp!=0;){
//    for(this.a=0;this.a<high;this.a++){
//      if(this.weatherList[this.a].main.temp==list[this.temp-1]){
//        console.log(this.a);
//        this.goodweather[this.l]=this.a;
//        this.l++;
//        this.temp--;
//      }
//   }
// }


  //   for(this.a=0;this.a<high;this.a++){
  //   this.bestresult2.push({
  //     temp:this.goodweather,
  //
  //    });
  //  }
  }
  goNewView2(){
    let m = this.modalCtrl.create(CalendarPage);
    m.onDidDismiss( (data) => {
      if(data!=0){
      this.start=new Date(data.year,data.month-1,data.day,18,0,0,0);

      data.day=parseInt(data.day)+parseInt(data.plus);

      console.log(data.day);
      this.end=new Date(data.year,data.month-1,data.day,18,0,0,0);
      Calendar.createCalendar('test용').then(
        (msg) => {},
        (err) => { console.log(err); }
      );
     Calendar.createEvent(data.title,data.city,data.note,this.start,this.end);
     data.day=parseInt(data.day)-parseInt(data.plus);
     Toast.show("날짜가 등록되었습니다.", 'long', 'center').subscribe(
     toast => {
       console.log(toast);
     }
     );
     Vibration.vibrate(1000);
     this.calenlist.push({
       title:data.title,
       city:data.city,
       day:data.month+"/"+data.day,
       img:this.images[this.num]
     });
     this.num++;
     if(this.num==3){
       this.num=0;
     }
    }
  });
    m.present();
  }
  goNewView3(){
    let m2 = this.modalCtrl.create(ContactPage);
    m2.onDidDismiss( (data) => {
      if(data!=0){
      let contact: Contact = Contacts.create();
      contact.name = new ContactName(null, data.name);
      contact.phoneNumbers = [new ContactField('mobile', data.phonenumber)];
      contact.save().then(
        () => console.log('Contact saved!', contact),
        (error: any) => console.error('Error saving contact.', error)

      );
      this.contactlist.push({
        name:data.name,
        pnumber:data.phonenumber
      });
      Toast.show(data.name+"번호가 등록되었습니다.", 'long', 'center').subscribe(
      toast => {
        console.log(toast);
      }
      );
      Vibration.vibrate(1000);
      }
   });
    m2.present();
  }
  contectconnection(pnumber){

    window.location = "tel:+82-"+pnumber;
    // Contacts.find(['phoneNumbers'],{filter:"01029249243"}).then((contacts)=>{
    //
    // });
  }
  pickcontact(){
    Contacts.pickContact().then((contact)=>{
      Contacts.find.name
    });
  }
  goNewView4(){
    SocialSharing.share("투게더함께하자구나",null,null,null);
    this.etc="recommend";
  }
  infor(){
    this.navCtrl.push(InformationPage);
  }
  getItems(ev: any) {

    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.contactlist = this.contactlist.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }
}
