import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule, RouterModule]
})
export class RegisterPage {
  name = '';
  email = '';
  password = '';
  phone = '';
  medicalData = '';

  register() {
    const user = { name: this.name, email: this.email, password: this.password, phone: this.phone, medicalData: this.medicalData };
    localStorage.setItem('user', JSON.stringify(user));

    console.log('Usuario registrado:', user);
    window.location.href = '/login';
  }
}
