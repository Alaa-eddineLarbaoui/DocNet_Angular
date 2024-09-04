import { AfterViewInit, Component, OnInit } from '@angular/core';
import { icon, marker, Marker, Map } from 'leaflet';
import * as L from 'leaflet';
import {DoctorService} from "../Service/doctor.service";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit, OnInit {
  map!: Map;
  markers: Marker[] = [];
  latitude!: number;
  longitude!: number;

  constructor(private doctorService: DoctorService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.initMap();
    this.loadDoctors(); // Automatically load doctors when the map is initialized
  }

  initMap(): void {
    this.map = L.map('map', {
      center: [0, 0], // Initialiser avec des coordonnées par défaut
      zoom: 2
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }

  loadDoctors(): void {
    this.doctorService.getAllHealthProfessionals()
      .subscribe(data => {
        console.log(data); // Ajoutez ceci pour vérifier les données reçues
        this.clearMarkers();
        if (data.length > 0) {
          // Set the map center to the first doctor's location
          this.map.setView([data[0].latitude, data[0].longitude], 12);
        }
        this.markers = data.map(doctor =>
          marker([doctor.latitude, doctor.longitude], {
            icon: icon({
              iconSize: [25, 41],
              iconAnchor: [12, 41],
              shadowAnchor: [4, 62],
              shadowSize: [41, 41],
              iconUrl: "assets/img/marker.jpg",
            })
          }).bindPopup(`
            <div class="popup-card">
              <h3>${doctor.username}</h3>
              <p><strong>Email:</strong> ${doctor.email}</p>
              <p><strong>Phone:</strong> ${doctor.phoneNumber}</p>
              <p><strong>Address:</strong> ${doctor.clinicAdress}</p>
              <p><strong>Specialty:</strong> ${doctor.specialty}</p>
              <p><strong>Registration Number:</strong> ${doctor.registrationNumber}</p>
              <p><strong>Coordinates:</strong> ${doctor.latitude}, ${doctor.longitude}</p>
            </div>
          `)
        );
        this.addMarkersToMap();
      });
  }

  addMarkersToMap(): void {
    this.markers.forEach(marker => marker.addTo(this.map));
  }

  private clearMarkers(): void {
    this.markers.forEach(marker => this.map.removeLayer(marker));
    this.markers = [];
  }
}
