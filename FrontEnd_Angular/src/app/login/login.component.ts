import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
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
  returnUrl: string = '/';

  constructor(
    private srv: LoginService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const person: LoginRequest = this.loginForm.value;
      this.srv.Login(person).subscribe({
        next: (res: any) => {
          localStorage.setItem('jwtData', res.token);
          try {
            const decodedToken: any = jwtDecode(res.token);
            console.log('Decoded Token:', decodedToken);
            const roles = decodedToken.role || [];
            console.log('Rôles de l\'utilisateur:', roles);

            if (roles.includes(Erole.ADMIN)) {
              this.router.navigate(['/calendar']);
            } else if (roles.includes(Erole.DOCTOR)) {
              this.router.navigate(['/notFound']);
            } else if (roles.includes(Erole.PATIENT)) {
              console.log('Utilisateur avec rôle PATIENT connecté.');
              this.router.navigateByUrl(this.returnUrl);
            } else {
              console.warn('Aucun rôle reconnu dans le token.');
              this.errorMessage = 'Erreur d\'autorisation. Contactez l\'administrateur.';
            }
          } catch (error) {
            console.error('Erreur lors du décodage du token:', error);
            this.errorMessage = 'Erreur lors de l\'authentification. Veuillez réessayer.';
          }
        },
        error: (err) => {
          this.errorMessage = 'Échec de la connexion. Veuillez réessayer.';
          console.error('Erreur de connexion:', err);
        }
      });
    } else {
      this.errorMessage = 'Veuillez remplir tous les champs obligatoires.';
      console.log('Le formulaire est invalide.');
    }
  }
}
