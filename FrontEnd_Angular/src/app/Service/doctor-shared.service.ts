import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {HealthProfessional} from "../Models/HealthProfessional";

@Injectable({
  providedIn: 'root'
})
export class DoctorSharedService {
  private filteredDoctors = new BehaviorSubject<HealthProfessional[]>([]);

  // Observable pour écouter les changements
  filteredDoctors$ = this.filteredDoctors.asObservable();

  // Mettre à jour les docteurs filtrés
  setFilteredDoctors(doctors: HealthProfessional[]) {
    this.filteredDoctors.next(doctors);
  }
}
