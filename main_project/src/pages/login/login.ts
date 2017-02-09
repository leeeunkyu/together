import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { NavController, Content } from 'ionic-angular';
import { Page1 } from '../page1/page1';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})

export class Login {
  @Input('iframe-resizer') sourceName: string;
  @ViewChild(Content) content: Content;
  showToolbar: boolean = false;

  constructor(public navCtrl: NavController, private el: ElementRef) {
  }

  goAppPage() { this.navCtrl.push(Page1) }

  toggleToolbar(){
    this.showToolbar = !this.showToolbar;
    this.content.resize();
  }
}
