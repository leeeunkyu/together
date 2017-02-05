import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map';

/*
  Generated class for the Myprovider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Myprovider {
  appId = 'e87ab490ad1d41011cbb71ccac307568';
  baseURL = 'http://api.openweathermap.org/data/2.5/'

  constructor(public http: Http) {
    console.log('Hello Myprovider Provider');
  }
  getWeatherByCity( city: string, country: string ) {
      let url = this.baseURL+'weather';
      url += '?appId=' + this.appId;
      url += '&q=' + city + ',' + country;
      url += '&units=metric';
      return this.http.get(url);
    }
}
