import { Component } from '@angular/core';
import { IonicModule, AlertController, ToastController, MenuController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {

  constructor(
    private alertCtrl: AlertController, 
    private toastCtrl: ToastController,
    private menuCtrl: MenuController
  ) {}

  async sendEmergency() {
    const alert = await this.alertCtrl.create({
      header: '🚨 Emergencia activada',
      message: 'Se ha enviado un mensaje de prueba a tu contacto de emergencia.',
      buttons: ['OK']
    });
    await alert.present();

    const toast = await this.toastCtrl.create({
      message: 'Mensaje de emergencia simulado enviado.',
      duration: 2000,
      color: 'danger',
      position: 'top'
    });
    await toast.present();
  }

  async logout() {
    // Aquí podrías limpiar sesión si quieres
    await this.menuCtrl.close(); // cerrar menú al hacer click
  }

  async closeMenu() {
    await this.menuCtrl.close(); // cerrar menú manualmente desde items si hace falta
  }
}
