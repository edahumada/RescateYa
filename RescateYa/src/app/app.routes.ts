import { Routes } from '@angular/router';
import { LoginPage } from './login/login.page';
import { HomePage } from './home/home.page';
import { ProfilePage } from './profile/profile.page';
import { RegisterPage } from './register/register.page';

const isLoggedIn = localStorage.getItem('loggedIn') === 'true';

export const routes: Routes = [
  {
    path: '',
    redirectTo: isLoggedIn ? 'home' : 'login',
    pathMatch: 'full'
  },
  { path: 'login', loadComponent: () => import('./login/login.page').then(m => m.LoginPage) },
  { path: 'register', loadComponent: () => import('./register/register.page').then(m => m.RegisterPage) },
  { path: 'home', loadComponent: () => import('./home/home.page').then(m => m.HomePage) },
  { path: 'profile', loadComponent: () => import('./profile/profile.page').then(m => m.ProfilePage) }
];
