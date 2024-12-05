import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="container">
      <h2>Connexion</h2>
      <form (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" class="form-control" [(ngModel)]="email" name="email" required>
        </div>
        <div class="form-group">
          <label for="password">Mot de passe:</label>
          <input type="password" id="password" class="form-control" [(ngModel)]="password" name="password" required>
        </div>
        <button type="submit" class="btn btn-primary">Se connecter</button>
      </form>
    </div>
  `
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.authService.login(this.email, this.password);
    this.router.navigate(['/medications']);
  }
}