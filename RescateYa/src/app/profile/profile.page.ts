import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule]
})
export class ProfilePage {
  user: any = {};

  constructor() {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
  }

  saveProfile() {
    localStorage.setItem('user', JSON.stringify(this.user));
    alert('Perfil actualizado');
  }
  logout() {
  localStorage.removeItem('loggedIn');
}
}
