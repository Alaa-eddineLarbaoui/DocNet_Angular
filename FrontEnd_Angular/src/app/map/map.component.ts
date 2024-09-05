import { AfterViewInit, Component, OnInit } from '@angular/core';
import { icon, marker, Marker, Map, divIcon } from 'leaflet';
import * as L from 'leaflet';
import { DoctorService } from "../Service/doctor.service";
import lottie from 'lottie-web'; // Importer Lottie

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
    this.loadDoctors(); // Charger les médecins avant d'initialiser la carte
  }

  loadDoctors(): void {
    this.doctorService.getAllHealthProfessionals()
      .subscribe(data => {
        console.log(data); // Vérifier les données reçues
        if (data.length > 0) {
          // Initialiser la carte avec la localisation du premier médecin
          this.initMap(data[0].latitude, data[0].longitude);

          this.clearMarkers();
          this.markers = data.map(doctor => {
            const lottieDiv = divIcon({
              className: '',
              html: '<div id="lottie-marker-' + doctor.id + '" style="width: 45px; height: 45px;"></div>',
              iconSize: [45, 45],
              iconAnchor: [25, 25]
            });

            const docMarker = marker([doctor.latitude, doctor.longitude], { icon: lottieDiv }).bindPopup(`
              <div class="popup-card">
                <h3>${doctor.username}</h3>
                <p><strong>Email:</strong> ${doctor.email}</p>
                <p><strong>Phone:</strong> ${doctor.phoneNumber}</p>
                <p><strong>Address:</strong> ${doctor.clinicAdress}</p>
                <p><strong>Specialty:</strong> ${doctor.specialty}</p>
                <p><strong>Registration Number:</strong> ${doctor.registrationNumber}</p>
                <p><strong>Coordinates:</strong> ${doctor.latitude}, ${doctor.longitude}</p>
              </div>
            `);

            docMarker.on('add', () => {
              lottie.loadAnimation({
                container: document.getElementById('lottie-marker-' + doctor.id) as Element,
                renderer: 'svg',
                loop: true,
                autoplay: true,
                path: 'assets/img/Animation - 1725491917670.json'  // chemin vers le fichier local
              });
            });

            return docMarker;
          });
          this.addMarkersToMap();
        }
      });
  }

  initMap(latitude: number, longitude: number): void {
    this.map = L.map('map', {
      center: [latitude, longitude], // Utiliser les coordonnées du premier médecin
      zoom: 12 // Ajuster le zoom en fonction des besoins
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }

  addMarkersToMap(): void {
    this.markers.forEach(marker => marker.addTo(this.map));
  }

  private clearMarkers(): void {
    this.markers.forEach(marker => this.map.removeLayer(marker));
    this.markers = [];
  }
}
