import { AfterViewInit, Component, OnInit } from '@angular/core';
import { divIcon, Map, marker, Marker } from 'leaflet';
import { DoctorService } from '../Service/doctor.service';
import lottie from 'lottie-web';
import * as L from 'leaflet';
import { HealthProfessional } from "../Models/HealthProfessional";

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
  idProf: number = 7;  // Health professional's ID

  constructor(private doctorService: DoctorService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.loadDoctor();
  }

  loadDoctor(): void {
    this.doctorService.getHealthProfById(this.idProf).subscribe((doctor: HealthProfessional) => {
      console.log('Doctor data received:', doctor);

      if (doctor) {

        this.clearMarkers();

        this.initMapp
        (doctor.latitude, doctor.longitude);

        // Create the marker for the doctor
        const lottieDiv = divIcon({
          className: '',
          html: `<div id="lottie-marker-${doctor.id}" style="width: 45px; height: 45px;"></div>`,
          iconSize: [45, 45],
          iconAnchor: [25, 25]
        });

        const docMarker = marker([doctor.latitude, doctor.longitude], {
          icon: lottieDiv
        });

        // Bind a popup to the markers
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

        // Load the Lottie animation when the marker is added to the map
        docMarker.on('add', () => {
          lottie.loadAnimation({
            container: document.getElementById(`lottie-marker-${doctor.id}`) as Element,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: 'assets/img/Animation - 1725491917670.json' // Make sure the animation path is correct
          });
        });

        // Add the marker to the map
        docMarker.addTo(this.map);

        // Add this marker to the marker list for possible cleanup later
        this.markers.push(docMarker);
      }
    });
  }

  initMapp(latitude: number, longitude: number): void {
    // Initialize the map if it doesn't exist yet
    if (!this.map) {
      this.map = L.map('map', {
        center: [latitude, longitude],
        zoom: 16 // Adjusted initial zoom
      });

      const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        minZoom: 3,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      });

      tiles.addTo(this.map);
    } else {
      // If the map already exists, recenter the view
      this.map.setView([latitude, longitude], 10);
    }
  }

  // Add all markers to the map
  addMarkersToMap(): void {
    this.markers.forEach(marker => marker.addTo(this.map));
  }

  // Clear all markers from the map
  private clearMarkers(): void {
    this.markers.forEach(marker => this.map.removeLayer(marker));
    this.markers = [];
  }
}
