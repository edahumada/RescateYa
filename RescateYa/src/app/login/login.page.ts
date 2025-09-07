import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule, RouterModule]
})
export class LoginPage {
  email = '';
  password = '';

  login() {
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');

    if (storedUser.email === this.email && storedUser.password === this.password) {
      localStorage.setItem('loggedIn', 'true');
      window.location.href = '/home';
    } else {
      alert('Email o contraseña incorrectos');
    }
  }
}
