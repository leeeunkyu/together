import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import { Page3 } from '../pages/page3/page3';
import { Login } from '../pages/login/login';
import { CalendarPage } from '../pages/calendar/calendar';
import { ContactPage } from '../pages/contact/contact';
import { Tutorial } from '../pages/tutorial/tutorial';
import { Storage } from '@ionic/storage'
import { Myprovider } from '../providers/myprovider';
import { MapPage } from '../pages/map/map';
import { ListPage } from '../pages/list/list';
import { Locations } from '../providers/locations';
import { GoogleMaps } from '../providers/google-maps';
import { Connectivity } from '../providers/connectivity';

@NgModule({
  declarations: [
    MyApp,
    Page1,
    Page2,
    Page3,
    Login,
    CalendarPage,
    ContactPage,
    Tutorial,
    MapPage,
    ListPage
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
    ContactPage,
    Tutorial,
    MapPage,
    ListPage
  ],
  providers: [Myprovider, Storage, Locations, GoogleMaps, Connectivity]
})
export class AppModule {}
