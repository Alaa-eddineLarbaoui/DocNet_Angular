import { AfterViewInit, Component, OnInit } from '@angular/core';
import { divIcon, Map, marker, Marker } from 'leaflet';
import { DoctorService } from '../Service/doctor.service';
import lottie from 'lottie-web';
import * as L from 'leaflet';
import {HealthProfessional} from "../Models/HealthProfessional";

@Component({
  selector: 'app-map-doctor',
  templateUrl: './map-doctor.component.html',
  styleUrls: ['./map-doctor.component.css']
})
export class MapDoctorComponent implements AfterViewInit, OnInit {
  map!: Map;
  markers: Marker[] = [];
  latitude!: number;
  longitude!: number;
  idProf: number = 7;  // ID du professionnel de santé

  constructor(private doctorService: DoctorService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.loadDoctor();
  }

  loadDoctor(): void {
    this.doctorService.getHealthProfById(this.idProf).subscribe((doctor: HealthProfessional) => {
      console.log('Doctor data received:', doctor);

      if (doctor) {
        // Supprimer les anciens marqueurs avant d'en ajouter de nouveaux
        this.clearMarkers();

        // Initialiser la carte avec la position du docteur
        this.initMap(doctor.latitude, doctor.longitude);

        // Créer le marqueur pour le docteur
        const lottieDiv = divIcon({
          className: '',
          html: `<div id="lottie-marker-${doctor.id}" style="width: 45px; height: 45px;"></div>`,
          iconSize: [45, 45],
          iconAnchor: [25, 25]
        });

        const docMarker = marker([doctor.latitude, doctor.longitude], {
          icon: lottieDiv
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

        // Charger l'animation Lottie lorsque le marqueur est ajouté à la carte
        docMarker.on('add', () => {
          lottie.loadAnimation({
            container: document.getElementById(`lottie-marker-${doctor.id}`) as Element,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: 'assets/img/Animation - 1725491917670.json' // Assurez-vous que le chemin vers l'animation est correct
          });
        });

        // Ajouter le marqueur à la carte
        docMarker.addTo(this.map);

        // Ajouter ce marqueur à la liste des marqueurs pour un éventuel nettoyage
        this.markers.push(docMarker);
      }
    });
  }

  initMap(latitude: number, longitude: number): void {
    // Initialisation de la carte si elle n'existe pas encore
    if (!this.map) {
      this.map = L.map('map', {
        center: [latitude, longitude],
        zoom: 10 // Zoom initial ajusté
      });

      const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        minZoom: 3,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      });

      tiles.addTo(this.map);
    } else {
      // Si la carte existe déjà, recentrer la vue
      this.map.setView([latitude, longitude], 10);
    }
  }

  // Ajouter tous les marqueurs à la carte
  addMarkersToMap(): void {
    this.markers.forEach(marker => marker.addTo(this.map));
  }

  // Effacer tous les marqueurs de la carte
  private clearMarkers(): void {
    this.markers.forEach(marker => this.map.removeLayer(marker));
    this.markers = [];
  }
}
