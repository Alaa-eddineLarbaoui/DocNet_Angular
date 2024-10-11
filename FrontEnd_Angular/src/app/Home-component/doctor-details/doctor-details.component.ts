import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ViewportScroller } from "@angular/common";
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import {HealthProfessional} from "../../Models/HealthProfessional";
import {DoctorService} from "../../Service/doctor.service";
import {LoginService} from "../../Service/login.service";
import {JwtDto} from "../../Dto-Entity/JwtDto";
import {AppointmentsComponent} from "../../appointments/appointments.component";


@Component({
  selector: 'app-doctor-details',
  templateUrl: './doctor-details.component.html',
  styleUrls: ['./doctor-details.component.css'],
})
export class DoctorDetailsComponent implements OnInit  {
  idProf!: number;
  doctorGet!: HealthProfessional;

  @ViewChild('stickyDiv') stickyDiv!: ElementRef;
  @ViewChild('section') section!: ElementRef;
  @ViewChild('Appointement') Appointement!: ElementRef;
  @ViewChild('detail') detail!: ElementRef;

  elementPosition: number = 0;
  sticky: boolean = false;
  idPatient!: number;

  constructor(
    private route: ActivatedRoute,
    private doctorService: DoctorService,
    private viewportScroller: ViewportScroller,
    private dialog: MatDialog , // Ajout du MatDialog pour gérer la popup
    private snackBar: MatSnackBar , // Injection de MatSnackBar
    public  logservice:LoginService


) {}

  ngOnInit(): void {
    this.getIdPersonFromJwt();
    this.idProf = +this.route.snapshot.paramMap.get('id')!;
    this.getDoctor();

    this.sticky = false;
    if (this.stickyDiv) {
      this.stickyDiv.nativeElement.classList.remove("sticky");
    }
  }

  ngAfterViewInit() {
    // Utilisation de setTimeout pour s'assurer que la vue est complètement chargée
    setTimeout(() => {
      this.elementPosition = this.stickyDiv.nativeElement.offsetTop;
    }, 0);
  }

  scrollToSection(section: string): void {
    const yOffset = -100;
    const element = document.getElementById(section);

    if (element) {
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({top: y, behavior: 'smooth'});
    }
  }

  getDoctor() {
    this.doctorService.getHealthProfById(this.idProf).subscribe((doctor: HealthProfessional) => {
      this.doctorGet = doctor;
    });
  }

  @HostListener('window:scroll', [])
  handleScroll() {
    const windowScroll = window.pageYOffset;
    const seuil = 180;


    if (windowScroll > seuil) {
      if (!this.sticky) {
        this.sticky = true;
        this.stickyDiv.nativeElement.classList.add("sticky");
        this.section.nativeElement.classList.add("section");
        this.Appointement.nativeElement.classList.add("sticky_Appointement");
        this.detail.nativeElement.classList.add("sticky_detail");
      }
    } else {
      if (this.sticky) {
        this.sticky = false;
        this.stickyDiv.nativeElement.classList.remove("sticky");
        this.section.nativeElement.classList.remove("section");
        this.Appointement.nativeElement.classList.remove("sticky_Appointement");
        this.detail.nativeElement.classList.remove("sticky_detail");
      }
    }
  }


  // Récupérer l'ID de l'utilisateur à partir du JWT
  getIdPersonFromJwt() {
    const storedJwtData = localStorage.getItem('jwtData');
    if (storedJwtData) {
      const jwtData: JwtDto = JSON.parse(storedJwtData);
      console.log('JWT Data:', jwtData.userId);
      this.idPatient = jwtData.userId;
    } else {
      console.log('Aucun JWT trouvé dans le localStorage');
    }
  }

  // Ouvrir le formulaire de rendez-vous dans une popup
  openAppointmentDialog(): void {
    const dialogRef = this.dialog.open(AppointmentsComponent, {
      width: '55%',
      data: { idProfessional: this.idProf }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Le dialog a été fermé', result);
      this.snackBar.open('The popup is closed, action successful!', 'Close', {
        duration: 3000
      });
    });
  }



}

