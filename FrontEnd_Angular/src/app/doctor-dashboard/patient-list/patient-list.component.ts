import {Component, OnInit} from '@angular/core';
import {AppointmentService} from "../../Service/AppointmentService";
import {Appointment} from "../../Models/Appointment";
import {JwtDto} from "../../Models/JwtDto";

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit{
  listAppointmentOfDoctor:Appointment[]=[]
  doctorId!:number;


  ngOnInit(): void {
    this.getIdPersonFromJwt()
    this.getAppointmentDoctor()
  }

  constructor(private appointmentService: AppointmentService) {
  }
  getAppointmentDoctor(): void {
    this.appointmentService.getAllByDoctorId(this.doctorId).subscribe((data: Appointment[]) => {
      this.listAppointmentOfDoctor = data;
    });
  }


  // Récupérer l'ID à partir du JWT
  getIdPersonFromJwt() {
    const storedJwtData = localStorage.getItem('jwtData');
    if (storedJwtData) {
      const jwtData: JwtDto = JSON.parse(storedJwtData);
      console.log('JWT Data:', jwtData.userId);
      this.doctorId = jwtData.userId;
    } else {
      console.log('Aucun JWT trouvé dans le localStorage');
    }
  }

}
