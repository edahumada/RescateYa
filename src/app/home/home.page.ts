import { Component } from '@angular/core';
import { IonicModule, ToastController } from '@ionic/angular';
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
  constructor(private toastCtrl: ToastController) {}

  async sendEmergency() {
    const toast = await this.toastCtrl.create({
      message: 'Emergencia enviada (demo)',
      duration: 2000,
      position: 'top',
      cssClass: 'emergency-toast',
    });

    await toast.present();
  }
}
