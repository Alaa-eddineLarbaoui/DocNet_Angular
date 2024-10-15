import { Component, OnInit, ViewChild } from '@angular/core';
import { AppointmentService } from "../../Service/AppointmentService";
import { Appointment } from "../../Models/Appointment";
import { JwtDto } from "../../Dto-Entity/JwtDto";
import { AppointmentStatus } from "../../Enums/AppointmentStatus";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { ThemePalette } from "@angular/material/core";
import { MessageNotificationService } from "../../Service/message-notification.service";
import {MatDialog} from "@angular/material/dialog";
import {MessageDialogComponent} from "../../message-dialog/message-dialog.component";
import {Notificatiion} from "../../Models/Notificatiion"; // Corrigez ici le nom du modèle

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit {
  listAppointmentOfDoctor: Appointment[] = [];
  doctorId!: number;
  displayedColumns: string[] = ['date', 'time', 'patient', 'reason', 'status', 'actions'];
  dataSource!: MatTableDataSource<Appointment>;
  message!: string;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private appointmentService: AppointmentService,
    private messageService: MessageNotificationService,
    private dialog: MatDialog,
) {}

  ngOnInit(): void {
    this.getIdPersonFromJwt();
    this.getAppointmentDoctor();
    console.log(this.doctorId + " iddddd");

    this.dataSource = new MatTableDataSource(this.listAppointmentOfDoctor);
    this.dataSource.paginator = this.paginator;
  }

  getAppointmentDoctor(): void {
    console.log("Récupération des rendez-vous du médecin");
    this.appointmentService.getAllByDoctorId(this.doctorId).subscribe((data: Appointment[]) => {
      this.listAppointmentOfDoctor = data;
      this.dataSource.data = this.listAppointmentOfDoctor; // Met à jour les données de la source
      console.log(data);
    });
  }

  // Récupérer l'ID à partir du JWT
  getIdPersonFromJwt(): void {
    const storedJwtData = localStorage.getItem('jwtData');
    if (storedJwtData) {
      const jwtData: JwtDto = JSON.parse(storedJwtData);
      console.log('JWT Data:', jwtData.userId);
      this.doctorId = jwtData.userId;
    } else {
      console.log('Aucun JWT trouvé dans le localStorage');
    }
  }

  viewDetails(appointment: Appointment): void {
    // Implémentez la logique pour afficher les détails du rendez-vous
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

  openMessageDialog(patientId: number): void {
    const dialogRef = this.dialog.open(MessageDialogComponent, {
      width: '300px',
      data: { patientId: patientId, doctorId: this.doctorId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // L'utilisateur a cliqué sur Envoyer
        this.sendMessage(result.patientId, result.doctorId, result.message);
      }
    });
  }

  sendMessage(patientId: number, doctorId: number, message: string): void {
    console.log(this.doctorId)
    this.messageService.sendNotification(patientId, this.doctorId, message).subscribe({
      next: (response: Notificatiion) => {
        alert('Notification sent successfully!');
      },
      error: (error) => {
        console.error('Error sending notification:', error);
      }
    });
  }
}
