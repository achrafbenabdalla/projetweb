import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="container">
      <h2>Inscription</h2>
      <form (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" class="form-control" [(ngModel)]="email" name="email" required>
        </div>
        <div class="form-group">
          <label for="password">Mot de passe:</label>
          <input type="password" id="password" class="form-control" [(ngModel)]="password" name="password" required>
        </div>
        <div class="form-group">
          <label for="confirmPassword">Confirmer le mot de passe:</label>
          <input type="password" id="confirmPassword" class="form-control" [(ngModel)]="confirmPassword" name="confirmPassword" required>
        </div>
        <button type="submit" class="btn btn-primary">S'inscrire</button>
      </form>
    </div>
  `
})
export class RegisterComponent {
  email = '';
  password = '';
  confirmPassword = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    if (this.password === this.confirmPassword) {
      this.authService.register(this.email, this.password);
      this.router.navigate(['/medications']);
    }
  }
}