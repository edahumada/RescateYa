import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule, RouterModule],
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private router: Router) {}

  login() {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      if (user.email === this.email && user.password === this.password) {
        localStorage.setItem('loggedIn', 'true');
        this.router.navigateByUrl('/home');
      } else {
        this.errorMessage = 'Credenciales incorrectas.';
      }
    } else {
      this.errorMessage = 'No hay usuarios registrados.';
    }
  }
}
