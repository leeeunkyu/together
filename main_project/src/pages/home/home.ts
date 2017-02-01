import { Component } from '@angular/core';
import {SocialSharing} from 'ionic-native'
import { NavController } from 'ionic-angular';
import {Camera} from 'ionic-native';
import {AlertController} from 'ionic-angular'
import {Storage} from '@ionic/storage';
import { SQLite } from 'ionic-native';
import {Slides,LoadingController } from 'ionic-angular'
// import {DatePicker} from 'ionic=native';
declare var cordova;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
//  imagePath:string;
//  imagePaths=[];
  photoplace:any;
  imagelist=[];
  imageshow=[];
  i:number;
  //image:string;
  phototime:string;
  photodate:string;
  today:number;
  time:number;
  db:string;
  lists=[];
  constructor(public navCtrl: NavController,public alertCtrl:AlertController, public storage:Storage ,public loadingCtrl: LoadingController) {
    storage.clear();
    this.storage.get("imagePaths").then(
      (value)=>{
        this.imageshow=value ?JSON.parse(value) : [];

    });
    this.storage.get("imagelists").then(
      (value)=>{
        this.imagelist=value ?JSON.parse(value) : [];

    });
    this.today= Date.now();
    console.log(this.today);
    console.log(Date.now());
  }
  takePhoto(){
    let options={
      quality:100,
      destinationType:Camera.DestinationType.FILE_URI,
      sourceType:Camera.PictureSourceType.CAMERA,
      saveToPhotoAlbum:true
    };
    Camera.getPicture(options).then((imagePath)=>{
       this.alertCtrl.create({
        enableBackdropDismiss:false,
        message:'memory',
        inputs:[{name:'message',placeholder:'Title'}],
        buttons:[{text:'cancel',role:'cancel' ,handler:()=>{console.log('Cancel clicked');}}
        ,{text:'upload photo',handler:(data)=> {
          this.photoplace=data.message
          this.imagelist.push({
          photo:this.photoplace,
          img:imagePath,
          time:this.today
          });

          let loder = this.loadingCtrl.create({
            content:'add photos..',
            duration: 2000
          });
          loder.present();
          this.storage.set("imagelists",JSON.stringify(this.imagelist));
          this.imageshow=[];
        for(this.i=1; 0<=this.imagelist.length-this.i ; this.i++){
          this.imageshow.push(this.imagelist[this.imagelist.length-this.i]);
        }
          this.imagesave(this.imageshow);
        }}]

      }).present();
      //SocialSharing.share('MP2016',null,imagePath,null);
    },(err)=>{
      console.log("err");
    });
  }

  imagesave(imageshow){
   //this.storage.set("imagePaths",JSON.stringify(this.imagePath));
   this.storage.set("imagePaths",JSON.stringify(imageshow));
  }
  remove(image){
    this.imageshow.splice(this.imageshow.indexOf(image),1);
    this.imagelist.splice(this.imagelist.indexOf(image),1);
    this.storage.set("imagePaths",JSON.stringify(this.imageshow));
      this.storage.set("imagelists",JSON.stringify(this.imagelist));
    }
  share(image){
    SocialSharing.share(image.photo,null,image.img,null)
  }
  plus(e,item){
    this.storage.set("list",JSON.stringify(item));
    this.storage.get("list").then(
      (value)=>{
        this.lists.push(JSON.parse(value))
    });
    console.log(this.lists);
  }



}
