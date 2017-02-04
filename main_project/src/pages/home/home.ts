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
  i=0;
  j=0;
  lists=[];
  //image:string;
  phototime:string;
  photodate:string;
  today:number;
  time:number;
  db:string;
  //lists=[];
  constructor(public navCtrl: NavController,public alertCtrl:AlertController, public storage:Storage ,public loadingCtrl: LoadingController) {
    storage.clear();
  //  this.lists=new Array(4);
    // for(let j=0;j<4;j++){
    //   this.lists[j];
    // }
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
          time:this.today,
          textcontent:[]
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
  plus(e,item,index){
    this.storage.set("list",JSON.stringify(item));
    this.storage.get("list").then(
      (value)=>{
        // this.lists[index].push(JSON.parse(value))
        // this.lists[index]=new Array(1);
        // this.lists[index][this.j]=JSON.parse(value);
        this.lists.push({
          a:this.j+'번째사진',
          b:this.j+'번째날짜',
          c:this.j+'번째기타등등',
          e:[]
        })

        //this.lists=new Array(1);
         this.lists[this.j].e.push({
           textcontent:value ?JSON.parse(value) : []
         });
         this.j++;

        //  this.imageshow[0].textcontent.push({
        //    da:'test'
        //  });
        //  this.j++;
    });
    console.log(this.lists);

  }



}
