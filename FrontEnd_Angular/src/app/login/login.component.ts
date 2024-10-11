import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from '@angular/material/snack-bar';
import { Erole } from "../Enums/Erole";
import { LoginRequest } from "../Models/LoginRequest";
import { LoginService } from "../Service/login.service";
import { jwtDecode } from "jwt-decode";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string = '';
  redirectUrl !: string ;
  hidePassword = true;

  constructor(
    public loginservice: LoginService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.redirectUrl = this.route.snapshot.queryParams['redirectUrl'] || '/calendar';
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const person: LoginRequest = this.loginForm.value;
      this.loginservice.Login(person).subscribe({
        next: (res: any) => {
          localStorage.setItem('jwtData', JSON.stringify(res));

          try {
            const decodedToken: any = jwtDecode(res.token);
            console.log('Decoded Token:', decodedToken);
            const roles = decodedToken.role || [];
            console.log('User roles:', roles);

            if (roles.includes(Erole.ADMIN)) {

                this.router.navigate(['/home']);

            } else if (roles.includes(Erole.DOCTOR)) {

                this.router.navigate(['/dashboard-doctor']);

            } else if (roles.includes(Erole.PATIENT)) {
                console.log('User with PATIENT role connected.');
                console.log(this.redirectUrl);
                this.router.navigateByUrl(this.redirectUrl);


            } else {
              console.warn('No recognized role in the token.');

              this.showError('Authorization error. Contact the administrator.');
            }
          } catch (error) {
            console.error('Error decoding the token:', error);
            this.showError('Error during authentication. Please try again.');
          }
        },
        error: (err) => {
          this.showError('Login failed. Please try again.');
          console.error('Login error:', err);
        }
      });
    } else {
      this.showError('Please fill in all required fields.');
      console.log('The form is invalid.');
    }
  }


    getErrorMessage(field: string): string {
    const control = this.loginForm.get(field);
    if (control && control.hasError('required')) {
      return 'Ce champ est requis';
    }
    return '';
  }

  private showError(message: string) {
    this.errorMessage = message;
    this.snackBar.open(message, 'Fermer', { duration: 5000 });
  }
}
