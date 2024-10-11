import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Erole } from "../Enums/Erole";
import { Router, ActivatedRoute } from "@angular/router";
import { SignupService } from "../Service/signup.service";
import { SignUpPatient } from "../Models/SignUpPatient";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUpForm: FormGroup;
  user: SignUpPatient = {
    username: '',
    email: '',
    password: '',
    role: Erole.PATIENT,
  };
  message: string = '';
  redirectUrl: string = '';

  constructor(
    private fb: FormBuilder,
    private userService: SignupService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.signUpForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.redirectUrl = params['redirectUrl'] || '/';
    });
  }

  onSubmit() {
    if (this.signUpForm.valid) {
      this.user.username = this.signUpForm.get('username')?.value;
      this.user.email = this.signUpForm.get('email')?.value;
      this.user.password = this.signUpForm.get('password')?.value;

      console.log(this.user);
      this.userService.registerPatient(this.user).subscribe(
        response => {
          console.log("Inscription réussie", response);

          this.message = 'Inscription réussie !';
          localStorage.setItem('redirectUrl', this.redirectUrl);

          // Redirection vers la page de login après un petit délai
          setTimeout(() => this.router.navigate(['/login']), 1);
        },
        error => {
          console.log('Erreur lors de l\'inscription : ', error);  // Affiche l'erreur dans la console
          this.message = 'Erreur lors de l\'inscription. Veuillez réessayer.';
        }
      );
    } else {
      this.message = 'Veuillez remplir correctement tous les champs.';
    }
  }

  goToLogin() {
    this.router.navigate(['/login'], { queryParams: { redirectUrl: this.redirectUrl } });
  }
}
