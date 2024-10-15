import { AfterViewInit, Component, OnInit } from '@angular/core';
import { marker, Marker, Map, divIcon } from 'leaflet';
import * as L from 'leaflet';
import { DoctorService } from "../../Service/doctor.service";
import { DoctorSharedService } from "../../Service/doctor-shared.service";


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

  constructor(
    private doctorService: DoctorService,
    private doctorSharedService: DoctorSharedService
  ) { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.loadDoctors();
  }

  loadDoctors(): void {
    this.doctorSharedService.filteredDoctors$.subscribe((data) => {
      console.log('data received:');
      console.log(data); // Liste des docteurs filtrés

      if (data.length > 0) {
        // Efface les anciens marqueurs
        this.clearMarkers();

        // Nouvelle position du premier docteur
        this.initMap(data[0].latitude, data[0].longitude);

        // Création des marqueurs pour chaque docteur
        this.markers = data.map((doctor) => {
          const icon = divIcon({
            className: '',
            html: `<img src="assets/img/icon_marker.png" style="width: 45px; height: 45px;" alt="Doctor Marker">`, // Chemin de votre image de marqueur
            iconSize: [45, 45],
            iconAnchor: [25, 25]
          });

          const docMarker = marker([doctor.latitude, doctor.longitude], {
            icon: icon
          });

          // Liaison d'une popup aux marqueurs
          docMarker.bindPopup(`
            <div class="popup-card">
              <h3>${doctor.username}</h3>
              <p><strong>Email:</strong> ${doctor.email}</p>
              <p><strong>Phone:</strong> ${doctor.phoneNumber}</p>
              <p><strong>Address:</strong> ${doctor.clinicAddress}</p>
              <p><strong>Specialty:</strong> ${doctor.specialty}</p>
              <p><strong>Registration Number:</strong> ${doctor.registrationNumber}</p>
              <p><strong>Coordinates:</strong> ${doctor.latitude}, ${doctor.longitude}</p>
            </div>
          `);

          return docMarker;
        });

        // Ajout des marqueurs à la carte
        this.addMarkersToMap();
      }
    });
  }

  initMap(latitude: number, longitude: number): void {
    // Initialisation de la carte si elle n'existe pas encore
    if (!this.map) {
      this.map = L.map('map', {
        center: [latitude, longitude],
        zoom: 5 // Zoom initial ajusté
      });

      const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        minZoom: 3,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      });

      tiles.addTo(this.map);
    } else {
      // Recentrer la carte si elle est déjà initialisée
      this.map.setView([latitude, longitude], 10);
    }
  }

  addMarkersToMap(): void {
    // Ajouter chaque marqueur à la carte
    this.markers.forEach((marker) => marker.addTo(this.map));
  }

  private clearMarkers(): void {
    // Efface tous les anciens marqueurs de la carte
    this.markers.forEach((marker) => this.map.removeLayer(marker));
    this.markers = [];
  }
}
