import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private restrictedTypes = ['1', '2']; 
  private crudEnabledTypes = ['21', '22', '99'];

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');

    // Redirect to login with alert if user is not authenticated
    if (!currentUser) {
      //window.alert('Username and password are invalid.');
      this.router.navigate(['/login']);
      return false;
    }

    // Block access for restricted user types
    if (this.restrictedTypes.includes(currentUser?.Usertype)) {
      this.router.navigate(['/login'], {
        queryParams: { error: 'Invalid Credentials' }
      });
      return false;
    }

    // Set CRUD permissions for authorized types
    if (this.crudEnabledTypes.includes(currentUser?.Usertype)) {
      localStorage.setItem('crud', 'true');
    } else {
      localStorage.setItem('crud', 'false');
    }

    return true;
  }
}
