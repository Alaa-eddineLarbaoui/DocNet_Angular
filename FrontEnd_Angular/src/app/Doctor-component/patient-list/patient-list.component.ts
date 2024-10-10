import {Component, OnInit, ViewChild} from '@angular/core';
import {AppointmentService} from "../../Service/AppointmentService";
import {Appointment} from "../../Models/Appointment";
import {JwtDto} from "../../Dto-Entity/JwtDto";
import {legacyMixinTabIndex} from "@angular/material/legacy-core";
import {AppointmentStatus} from "../../Enums/AppointmentStatus";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {ThemePalette} from "@angular/material/core";

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit {
  listAppointmentOfDoctor: Appointment[] = []
  doctorId!: number;
  displayedColumns: string[] = ['date', 'time', 'patient', 'reason', 'status', 'actions'];
  dataSource!: MatTableDataSource<Appointment>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;


  ngOnInit(): void {
    this.getIdPersonFromJwt()
    this.getAppointmentDoctor()

    this.dataSource = new MatTableDataSource(this.listAppointmentOfDoctor);
    this.dataSource.paginator = this.paginator;
  }

  constructor(private appointmentService: AppointmentService) {
  }

  getAppointmentDoctor(): void {
    this.appointmentService.getAllByDoctorId(this.doctorId).subscribe((data: Appointment[]) => {
      const appointments = this.listAppointmentOfDoctor = data;
      appointments.forEach((appointment: Appointment) => {
        console.log(`ID: ${appointment.id}`);
        console.log(`Date: ${appointment.date}`);
        console.log(`Time: ${appointment.time}`);
        console.log(`Status: ${appointment.status}`);
        console.log(`Reason: ${appointment.appointmentReason}`);
        console.log(`Notification: ${appointment.notificationEnvoyee}`);
        console.log(`Note: ${appointment.note}`);
        console.log(`Patient ID: ${appointment.patient}`);
        console.log(`Professional ID: ${appointment.professional}`);
        console.log('-----------------------'); // Séparation entre chaque rendez-vous

      });
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


  viewDetails(appointment: Appointment) {

  }

  getStatusColor(status: AppointmentStatus): ThemePalette {
    switch (status) {
      case AppointmentStatus.SCHEDULED:
        return 'primary';
      case AppointmentStatus.RESERVED:
        return 'accent';
      case AppointmentStatus.CANCELLED:
        return 'warn';
      default:
        return undefined;
    }
  }
}
