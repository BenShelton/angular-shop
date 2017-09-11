import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as rootReducer from '../reducers';

@Injectable()
export class ManagerGuard implements CanActivate {
  constructor(
    private store: Store<rootReducer.State>,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    let allowed = false;
    this.store.select(rootReducer.getUser)
      .take(1)
      .subscribe(user => allowed = user.role === 'manager');
    if (!allowed) { this.router.navigate(['/login']); }
    return allowed;
  }
}
