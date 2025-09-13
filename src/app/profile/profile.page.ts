import { Component } from '@angular/core';
import { IonicModule, MenuController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface EmergencyContact {
  name: string;
  phone: string;
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule],
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss']
})
export class ProfilePage {
  user: any = {
    name: '',
    email: '',
    phone: '',
    address: '',
    medicalData: ''
  };

  emergencyContacts: EmergencyContact[] = [];

  constructor(private menuCtrl: MenuController, private router: Router) {
    this.loadProfile();
  }

  loadProfile() {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.user = JSON.parse(storedUser);
    }

    const storedContacts = localStorage.getItem('emergencyContacts');
    if (storedContacts) {
      this.emergencyContacts = JSON.parse(storedContacts);
    }
  }

  saveProfile() {
    localStorage.setItem('user', JSON.stringify(this.user));
    localStorage.setItem('emergencyContacts', JSON.stringify(this.emergencyContacts));
    alert('Perfil actualizado');
  }

  addContact() {
    this.emergencyContacts.push({ name: '', phone: '' });
  }

  removeContact(index: number) {
    this.emergencyContacts.splice(index, 1);
  }

  closeMenu() {
    this.menuCtrl.close('main-menu');
  }

  logout() {
    // Borra sesión y datos
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('user');
    localStorage.removeItem('emergencyContacts');

    // Cierra menú si estaba abierto
    this.closeMenu();

    // Redirige a login
    this.router.navigate(['/login']);
  }
}
