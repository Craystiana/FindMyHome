import { Component, EventEmitter, Input, NgZone, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  public GoogleAutocomplete: google.maps.places.AutocompleteService;
  public autocomplete: any;
  public autocompleteItems: any;
  public geocoder: google.maps.Geocoder;
  public marker: google.maps.Marker | undefined;
  public map: google.maps.Map | undefined;
  @Input() showSearch: boolean = false;
  @Input() latitude: number | undefined;
  @Input() longitude: number | undefined;

  @Output() selectionCancel = new EventEmitter<void>();
  @Output() selectionChange = new EventEmitter<{latitude: number | undefined, longitude: number | undefined}>();

  constructor(private zone: NgZone) {
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocomplete = { input: '' };
    this.autocompleteItems = [];
    this.geocoder = new google.maps.Geocoder;
  }

  ionViewWillEnter(){
    this.createMap();
    if (this.latitude && this.longitude) {
      this.setMarker(new google.maps.LatLng(this.latitude, this.longitude));
    }
  }

  ngOnInit(): void {
    this.createMap();
    if (this.latitude && this.longitude) {
      this.setMarker(new google.maps.LatLng(this.latitude, this.longitude));
    }
  }

  cancelChanges() {
    this.selectionCancel.emit();
  }

  confirmChanges() {
    const value = {latitude: this.latitude, longitude: this.longitude};
    this.selectionChange.emit(value);
  }

  async createMap() {
    var mapElement = document.getElementById('map') as HTMLElement;
    this.map = new google.maps.Map(mapElement, {
      center: { lat: this.latitude ?? 44.439663, lng: this.longitude ?? 26.096306 },
      zoom: 15
    });

    google.maps.event.addListener(this.map, 'click', (event: any) => {
      this.setMarker(event.latLng)
    });
  }

  setMarker(location: google.maps.LatLng) {
    this.marker?.setMap(null);
    this.marker = new google.maps.Marker({
      position: location,
      map: this.map,
    });
    this.map?.setCenter(location);
    this.latitude = location.lat();
    this.longitude = location.lng();
  }

  updateSearchResults() {
    if (this.autocomplete.input === '') {
      this.autocompleteItems = [];
      return;
    }
    this.GoogleAutocomplete.getPlacePredictions({ input: this.autocomplete.input },
    (predictions: any) => {
      this.autocompleteItems = [];
      this.zone.run(() => {
        predictions?.forEach((prediction: any) => {
          this.autocompleteItems.push(prediction);
        });
      });
    });
  }

  selectSearchResult(item: any) {
    this.autocompleteItems = [];
  
    this.geocoder.geocode({'placeId': item.place_id}, (results: any, status: any) => {
      if(status === 'OK' && results && results[0]){
        this.setMarker(results[0].geometry.location);
      }
    })
  }

}
