import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  login(email: string, password: string): void {
    // Simuler une authentification
    this.isAuthenticatedSubject.next(true);
  }

  register(email: string, password: string): void {
    // Simuler un enregistrement
    this.isAuthenticatedSubject.next(true);
  }

  logout(): void {
    this.isAuthenticatedSubject.next(false);
  }
}