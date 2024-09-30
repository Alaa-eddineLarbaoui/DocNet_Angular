import { Component, ElementRef, HostListener, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { DoctorService } from "../Service/doctor.service";
import { HealthProfessional } from "../Models/HealthProfessional";
import { ViewportScroller } from "@angular/common";

@Component({
  selector: 'app-doctor-details',
  templateUrl: './doctor-details.component.html',
  styleUrls: ['./doctor-details.component.css'],
})
export class DoctorDetailsComponent implements OnInit {
  idProf!: number;
  doctorGet!: HealthProfessional;

  @ViewChild('stickyDiv') stickyDiv!: ElementRef;
  @ViewChild('section') section!: ElementRef;
  @ViewChild('Appointement') Appointement!: ElementRef;
  @ViewChild('detail') detail!: ElementRef;

  elementPosition: number = 0;
  sticky: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private doctorService: DoctorService,
    private viewportScroller: ViewportScroller
  ) { }

  ngOnInit(): void {
    this.idProf = +this.route.snapshot.paramMap.get('id')!;
    this.getDoctor();
  }

  ngAfterViewInit() {
    // Utilisation de setTimeout pour attendre que la vue soit complètement chargée
    setTimeout(() => {
      this.elementPosition = this.stickyDiv.nativeElement.offsetTop;
    }, 0);
  }

  scrollToSection(section: string): void {
    const yOffset = -100;
    const element = document.getElementById(section);

    if (element) {
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
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

    if (windowScroll >= this.elementPosition) {
      this.sticky = true;
      this.stickyDiv.nativeElement.classList.add("sticky");
      this.section.nativeElement.classList.add("section");
      this.Appointement.nativeElement.classList.add("sticky_Appointement");
      this.detail.nativeElement.classList.add("sticky_detail");
    } else {
      this.sticky = false;
      this.stickyDiv.nativeElement.classList.remove("sticky");
      this.section.nativeElement.classList.remove("section");
      this.Appointement.nativeElement.classList.remove("sticky_Appointement");
      this.detail.nativeElement.classList.remove("sticky_detail");
    }
  }
}
