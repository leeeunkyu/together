import { Component } from '@angular/core';
import { MapPage } from '../map/map';
import { ListPage } from '../list/list';
import { LocationTracker } from '../../providers/location-tracker';

declare var google;

@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html'
})
export class Page1 {
  tab1Root: any = MapPage;
  tab2Root: any = ListPage;
  constructor( public locationTracker: LocationTracker ){

  }

  start(){
    this.locationTracker.startTracking();
  }

  stop(){
    this.locationTracker.stopTracking();
  }
}
