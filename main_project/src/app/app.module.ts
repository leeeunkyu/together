import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import { Page3 } from '../pages/page3/page3';
import { Login } from '../pages/login/login';
import { CalendarPage } from '../pages/calendar/calendar';
import { ContactPage } from '../pages/contact/contact';
import { Myprovider } from '../providers/myprovider';

@NgModule({
  declarations: [
    MyApp,
    Page1,
    Page2,
    Page3,
    Login,
    CalendarPage,
    ContactPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Page1,
    Page2,
    Page3,
    Login,
    CalendarPage,
    ContactPage
  ],
  providers: [Myprovider]
})
export class AppModule {}
