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
  returnUrl: string = '/';
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

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
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
              this.showError('Erreur d\'autorisation. Contactez l\'administrateur.');
            }
          } catch (error) {
            console.error('Erreur lors du décodage du token:', error);
            this.showError('Erreur lors de l\'authentification. Veuillez réessayer.');
          }
        },
        error: (err) => {
          this.showError('Échec de la connexion. Veuillez réessayer.');
          console.error('Erreur de connexion:', err);
        }
      });
    } else {
      this.showError('Veuillez remplir tous les champs obligatoires.');
      console.log('Le formulaire est invalide.');
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
