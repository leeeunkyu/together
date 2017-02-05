import { Component, Directive, OnDestroy, HostListener, ElementRef, Input  } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Page1 } from '../page1/page1';

@Component({
  selector: 'loginPage',
  templateUrl: 'login.html'
})

export class Login {
  @Input('iframe-resizer') sourceName: string;

  constructor(public navCtrl: NavController, private el: ElementRef) {
  }

  goAppPage() { this.navCtrl.push(Page1) }

  onMessage(event: any) {
        if ('undefined' !== typeof event.data &&
            'undefined' !== typeof event.data.type &&
             event.data.type === 'resize' &&
            'undefined' !== typeof event.data.source &&
             event.data.source === this.sourceName) {
                this.resizeFrame(event.data);
        }
    }

  // Auto Resize Function
  resizeFrame(data) {
    if ('undefined' !== typeof data.value && 'undefined' !== typeof data.value.height) {
      if (this.el.nativeElement.clientHeight !== Number(data.value.height)) {
        this.el.nativeElement.style.height = data.value.height + 'px';
      }
    }
  }


}
