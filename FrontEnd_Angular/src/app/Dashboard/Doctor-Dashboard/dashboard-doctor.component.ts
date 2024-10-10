import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import {LoginService} from "../../Service/login.service";

@Component({
  selector: 'app-dashboard-doctor',
  templateUrl: './dashboard-doctor.component.html',
  styleUrls: ['./dashboard-doctor.component.css']
})
export class DashboardDoctorComponent implements OnInit {

  @ViewChild('headerToggle') headerToggle!: ElementRef;
  @ViewChild('navBar') navBar!: ElementRef;
  @ViewChild('bodyPd') bodyPd!: ElementRef;
  @ViewChild('header') header!: ElementRef;
  navLinks: NodeListOf<Element> | undefined;

  constructor(public loginService: LoginService) {
  }
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
        // Toggle navbar visibility
        nav.classList.toggle('show');
        // Toggle icon class
        toggle.classList.toggle('bx-x');
        // Add/remove padding to body and header
        bodypd.classList.toggle('body-pd');
        headerpd.classList.toggle('body-pd');
      });
    }
  }

  addLinkActive(): void {
    this.navLinks = document.querySelectorAll('.nav_link');

    const colorLink = (event: Event) => {
      this.navLinks?.forEach(link => link.classList.remove('active'));
      const target = event.target as HTMLElement;
      target.classList.add('active');
    };

    this.navLinks?.forEach(link => link.addEventListener('click', colorLink));
  }



}
