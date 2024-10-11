import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-sign-login',
  templateUrl: './sign-login.component.html',
  styleUrls: ['./sign-login.component.css']
})
export class SignLoginComponent implements OnInit {

  redirectUrl: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.redirectUrl = this.route.snapshot.queryParams['redirectUrl'] ;
    this.getReturnUrlFromLocalStorage();
  }

  navigateToSignUp() {
    this.router.navigate(['/sign'], { queryParams: { redirectUrl: this.redirectUrl } });
  }

  navigateToLogin() {
    this.router.navigate(['/login'], { queryParams: { redirectUrl: this.redirectUrl } });
  }

  getReturnUrlFromLocalStorage() {
    const storedReturnUrl = localStorage.getItem('redirectUrl');
    if (storedReturnUrl) {
      this.redirectUrl = storedReturnUrl;
    }
  }
}
