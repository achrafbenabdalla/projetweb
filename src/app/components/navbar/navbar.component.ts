import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <nav class="navbar">
      <div class="nav-brand">
        <a routerLink="/" class="logo">PharmacieOnline</a>
      </div>
      <div class="nav-links">
        <a routerLink="/" class="nav-link">Accueil</a>
        <a routerLink="/medications" class="nav-link">Produits</a>
        <ng-container *ngIf="!isLoggedIn">
          <a routerLink="/login" class="nav-link auth-button login">Connexion</a>
          <a routerLink="/register" class="nav-link auth-button register">Inscription</a>
        </ng-container>
        <ng-container *ngIf="isLoggedIn">
          <a routerLink="/cart" class="nav-link">Panier</a>
          <button (click)="logout()" class="nav-link auth-button logout">Déconnexion</button>
        </ng-container>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 2rem;
      background: white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
    }

    .logo {
      font-size: 1.5rem;
      font-weight: bold;
      color: #4CAF50;
      text-decoration: none;
    }

    .nav-links {
      display: flex;
      align-items: center;
      gap: 1.5rem;
    }

    .nav-link {
      text-decoration: none;
      color: #333;
      font-weight: 500;
      transition: color 0.3s ease;
    }

    .nav-link:hover {
      color: #4CAF50;
    }

    .auth-button {
      padding: 0.5rem 1rem;
      border-radius: 20px;
      border: none;
      cursor: pointer;
      font-weight: 500;
      transition: all 0.3s ease;
    }

    .login {
      background: #4CAF50;
      color: white;
    }

    .register {
      background: white;
      color: #4CAF50;
      border: 2px solid #4CAF50;
    }

    .logout {
      background: #ff4444;
      color: white;
    }

    .auth-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    }
  `]
})
export class NavbarComponent {
  isLoggedIn = false;

  constructor(private authService: AuthService) {
    this.authService.isAuthenticated$.subscribe(
      isAuthenticated => this.isLoggedIn = isAuthenticated
    );
  }

  logout() {
    this.authService.logout();
  }
}