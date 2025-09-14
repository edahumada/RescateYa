import { Component } from '@angular/core';
import { IonicModule, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GeolocationService } from '../services/geolocation.service';

interface EmergencyContact {
  name: string;
  phone: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  currentLocation: string = '';

  constructor(
    private toastCtrl: ToastController,
    private geolocationService: GeolocationService
  ) {}

  
  async sendEmergency() {
    const storedContacts = localStorage.getItem('emergencyContacts');
    let emergencyContacts: EmergencyContact[] = [];
    if (storedContacts) {
      emergencyContacts = JSON.parse(storedContacts);
    }

    if (emergencyContacts.length === 0) {
      const toast = await this.toastCtrl.create({
        message: 'No hay contactos de emergencia configurados.',
        duration: 3000,
        position: 'top',
        color: 'danger',
      });
      await toast.present();
      return;
    }

    try {
      const position = await this.geolocationService.getCurrentPosition();
      const coords = position.coords;
      this.currentLocation = `Lat: ${coords.latitude}, Lng: ${coords.longitude}`;

      const message = `Necesito ayuda. Mi ubicación: ${this.currentLocation}`;
      const contact = emergencyContacts[0]; // Send to first contact
      const smsUrl = `sms:${contact.phone}?body=${encodeURIComponent(message)}`;
      window.location.href = smsUrl;

      const toast = await this.toastCtrl.create({
        message: `Mensaje de emergencia enviado a ${contact.name} (${contact.phone})`,
        duration: 3000,
        position: 'top',
        cssClass: 'emergency-toast',
      });

      await toast.present();
    } catch (error) {
      const toast = await this.toastCtrl.create({
        message: 'Error obteniendo ubicación. Mensaje enviado sin ubicación.',
        duration: 3000,
        position: 'top',
        color: 'warning',
      });

      await toast.present();
    }
  }

  async getLocation() {
    try {
      const position = await this.geolocationService.getCurrentPosition();
      const coords = position.coords;
      this.currentLocation = `Lat: ${coords.latitude}, Lng: ${coords.longitude}`;

      const toast = await this.toastCtrl.create({
        message: `Ubicación actual: ${this.currentLocation}`,
        duration: 2000,
        position: 'bottom',
      });

      await toast.present();
    } catch (error) {
      const toast = await this.toastCtrl.create({
        message: 'Error obteniendo ubicación',
        duration: 2000,
        position: 'bottom',
        color: 'danger',
      });

      await toast.present();
    }
  }
}
