import { Component } from '@angular/core';
import { IonicModule, ToastController } from '@ionic/angular';
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
  address = '';
  medicalData = '';

  emergencyContacts = [
    { name: 'Contacto Emergencia 1', phone: '0987654321' },
  ];

  constructor(private router: Router, private toastCtrl: ToastController) {}

  async register() {
    // Guardar usuario en localStorage (demo)
    const user = {
      name: this.name,
      email: this.email,
      password: this.password,
      phone: this.phone,
      address: this.address,
      medicalData: this.medicalData
    };

    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('emergencyContacts', JSON.stringify(this.emergencyContacts));
    localStorage.setItem('loggedIn', 'true');

    const toast = await this.toastCtrl.create({
      message: 'Usuario de prueba creado y registrado.',
      duration: 2000,
      position: 'bottom',
    });
    await toast.present();

    this.router.navigate(['/home']);
  }
}
