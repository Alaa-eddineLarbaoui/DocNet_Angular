import { Component, OnInit } from '@angular/core';
import { LoginService } from "../../Service/login.service";

@Component({
  selector: 'app-dashboard-doctor',
  templateUrl: './dashboard-doctor.component.html',
  styleUrls: ['./dashboard-doctor.component.css']
})
export class DashboardDoctorComponent implements OnInit {

  navLinks: NodeListOf<Element> | undefined;

  constructor(public loginService: LoginService) { }

  ngOnInit(): void {
    this.showNavbar('header-toggle', 'nav-bar', 'body-pd', 'header');
    this.addLinkActive();
  }

  showNavbar(toggleId: string, navId: string, bodyId: string, headerId: string): void {
    const toggle = document.getElementById(toggleId);
    const nav = document.getElementById(navId);
    const bodypd = document.getElementById(bodyId);
    const headerpd = document.getElementById(headerId);

    if (toggle && nav && bodypd && headerpd) {
      toggle.addEventListener('click', () => {
        // Toggle la visibilité de la barre de navigation
        nav.classList.toggle('show');
        // Change la classe de l'icône
        toggle.classList.toggle('bx-x');
        // Ajoute/retire le padding du body et de l'en-tête
        bodypd.classList.toggle('body-pd');
        headerpd.classList.toggle('body-pd');
      });
    }
  }

  addLinkActive(): void {
    this.navLinks = document.querySelectorAll('.nav_link');

    const colorLink = (event: Event) => {
      this.navLinks?.forEach(link => link.classList.remove('active'));
      const target = event.currentTarget as HTMLElement; // Utilisez currentTarget pour obtenir le bon élément
      target.classList.add('active');
    };

    this.navLinks?.forEach(link => {
      link.addEventListener('click', colorLink);
    });
  }
}
