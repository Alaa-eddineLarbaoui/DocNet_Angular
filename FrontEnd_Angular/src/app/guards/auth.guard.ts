import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LoginService } from '../Service/login.service';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private authService: LoginService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.checkAuth(state.url);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.checkAuth(state.url);
  }

  private checkAuth(url: string): boolean {
    const token = localStorage.getItem('jwtData');

    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        const roles = decodedToken.role || [];
        console.log('Rôles de l\'utilisateur : ', roles);

        // Redirection selon le rôle et l'URL demandée
        if (url.startsWith('/admin') && roles.includes('ADMIN')) {
          return true;  // Accès autorisé pour Admin

        } else if (url.startsWith('/dashboard-doctor') && roles.includes('DOCTOR')) {
          return true;  // Accès autorisé pour Doctor

        } else if (url.startsWith('/patient') && roles.includes('PATIENT')) {
          return true;  // Accès autorisé pour Patient

        } else {
          // Si le rôle n'est pas autorisé pour l'URL demandée
          this.router.navigate(['/login'], { queryParams: { returnUrl: url } });
          return false;
        }
      } catch (error) {
        console.error('Erreur lors du décodage du token:', error);
        this.router.navigate(['/login'], { queryParams: { returnUrl: url } });
        return false;
      }
    } else {
      // Si pas de token, rediriger vers la page de login
      this.router.navigate(['/login'], { queryParams: { returnUrl: url } });
      return false;
    }
  }
}
