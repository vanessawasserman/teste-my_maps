import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';

declare var google: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  start = 'chichago,il';
  end = 'chicago, il';
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;
  constructor(
    public navCtrl: NavController,
    private platform: Platform
  ){
    platform.ready().then(() => {
      this.initMap();
    })
  }

  initMap(){
    var happycode = {
      lat: -23.625183,
      lng: -46.737448
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 16,
      center: happycode,
      disableDefaultUI: true
    });
    this.directionsDisplay.setMap(this.map);

    var marker = new google.maps.Marker({
      position: happycode,
      map:this.map,
      title: 'My Position!'
    });
  }
calculateAndDisplayRoute()
{
  this.directionsService.route({
    origin: this.start,
    destination: this.end,
    travelMode: 'DRIVING'
  }, (response, status) => {
    if (status === 'OK') {
      this.directionsDisplay.setDirections(response);
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
  }
}
