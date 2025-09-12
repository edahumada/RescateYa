import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule]
})
export class RegisterPage {
  name = '';
  email = '';
  password = '';
  phone = '';
  medicalData = '';

  constructor(private router: Router) {}

  register() {
    // Guardar usuario en localStorage (demo)
    const user = {
      name: this.name,
      email: this.email,
      password: this.password,
      phone: this.phone,
      medicalData: this.medicalData
    };

    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('loggedIn', 'true');

    alert('Registro exitoso (demo)');
    this.router.navigate(['/home']);
  }
}
