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
  successMessage: string = '';
  highContrastMode: boolean = false;
  isLoading: boolean = false;

  constructor(private menuCtrl: MenuController, private router: Router) {
    this.loadProfile();
  }

  ionViewWillEnter() {
    // Cargar preferencia de alto contraste
    const savedMode = localStorage.getItem('highContrastMode');
    if (savedMode) {
      this.highContrastMode = savedMode === 'true';
    }
  }

  loadProfile() {
    this.isLoading = true;
    
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.user = JSON.parse(storedUser);
    }

    const storedContacts = localStorage.getItem('emergencyContacts');
    if (storedContacts) {
      this.emergencyContacts = JSON.parse(storedContacts);
    }
    
    this.isLoading = false;
  }

  saveProfile() {
    this.isLoading = true;
    
    localStorage.setItem('user', JSON.stringify(this.user));
    localStorage.setItem('emergencyContacts', JSON.stringify(this.emergencyContacts));
    
    this.successMessage = 'Perfil actualizado correctamente';
    
    // Ocultar mensaje después de 3 segundos
    setTimeout(() => {
      this.successMessage = '';
      this.isLoading = false;
    }, 3000);
  }

  addContact() {
    this.emergencyContacts.push({ name: '', phone: '' });
  }

  removeContact(index: number) {
    if (confirm('¿Estás seguro de que quieres eliminar este contacto de emergencia?')) {
      this.emergencyContacts.splice(index, 1);
    }
  }

  closeMenu() {
    this.menuCtrl.close('main-menu');
  }

  toggleAccessibility() {
    this.highContrastMode = !this.highContrastMode;
    localStorage.setItem('highContrastMode', this.highContrastMode.toString());
  }

  logout() {
    if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
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

  // Validación básica de teléfono
  validatePhone(phone: string): boolean {
    const phoneRegex = /^[0-9+\-\s()]{10,}$/;
    return phoneRegex.test(phone);
  }

  // Validación básica de email
  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Verificar si el perfil tiene datos mínimos
  hasMinimumData(): boolean {
    return !!this.user.name && !!this.user.phone && this.emergencyContacts.length > 0;
  }

  // Obtener sugerencias para completar perfil
  getProfileCompletionTips(): string[] {
    const tips: string[] = [];
    
    if (!this.user.name) tips.push('Agrega tu nombre completo');
    if (!this.user.phone) tips.push('Agrega tu número de teléfono');
    if (!this.user.address) tips.push('Agrega tu dirección');
    if (!this.user.medicalData) tips.push('Agrega información médica importante');
    if (this.emergencyContacts.length === 0) tips.push('Agrega al menos un contacto de emergencia');
    
    return tips;
  }
}