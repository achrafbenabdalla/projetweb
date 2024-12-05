import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MedicationsComponent } from './components/medications/medications.component';
import { CartComponent } from './components/cart/cart.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'medications', component: MedicationsComponent },
  { path: 'cart', component: CartComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '' }
];