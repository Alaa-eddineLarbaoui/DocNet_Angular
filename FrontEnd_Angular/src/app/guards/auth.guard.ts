import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { LoginService } from '../Service/login.service';
import { jwtDecode } from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private authService: LoginService, private router: Router) {}

  canActivate(): boolean {
    return this.checkAuth();
  }

  canActivateChild(): boolean {
    return this.checkAuth();
  }

  private checkAuth(): boolean {
    const token = localStorage.getItem('jwtData');

    if (token) {
      const decodedToken: any = jwtDecode(token);
      const roles = decodedToken.role || [];
      console.log('Rôles de lutilisateur : ', roles);

      // Redirection selon le rôle
      const requestedUrl = this.router.url;  // Récupérer l'URL demandée

      if (requestedUrl.startsWith('/admin') && roles.includes('ADMIN')) {
        return true;  // Accès autorisé pour Admin

      } else if (requestedUrl.startsWith('/doctor') && roles.includes('DOCTOR')) {
        return true;  // Accès autorisé pour Doctor

      } else if (requestedUrl.startsWith('/patient') && roles.includes('PATIENT')) {
        return true;  // Accès autorisé pour Patient

      } else {
        // Si le rôle n'est pas autorisé pour l'URL demandée
        this.router.navigate(['/login']);

        return false;
      }
    } else {
      // Si pas de token, rediriger vers la page de login
      this.router.navigate(['/login']);
      return false;
    }
  }
}
