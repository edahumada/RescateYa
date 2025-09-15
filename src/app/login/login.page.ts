import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule, RouterModule],
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  highContrastMode: boolean = false;
  isLoading: boolean = false;

  constructor(
    private router: Router,
    private alertController: AlertController
  ) {}

  login() {
    // Resetear mensaje de error
    this.errorMessage = '';
    this.isLoading = true;

    // Validación básica
    if (!this.email || !this.password) {
      this.errorMessage = 'Por favor, completa todos los campos';
      this.isLoading = false;
      return;
    }

    if (!this.isValidEmail(this.email)) {
      this.errorMessage = 'Por favor, ingresa un email válido';
      this.isLoading = false;
      return;
    }

    // Simular delay de red para mejor UX
    setTimeout(() => {
      const userData = localStorage.getItem('user');
      if (userData) {
        const user = JSON.parse(userData);
        if (user.email === this.email && user.password === this.password) {
          localStorage.setItem('loggedIn', 'true');
          this.router.navigateByUrl('/home');
        } else {
          this.errorMessage = 'Credenciales incorrectas.';
        }
      } else {
        this.errorMessage = 'No hay usuarios registrados.';
      }
      this.isLoading = false;
    }, 1000);
  }

  // Validación de email
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Alternar modo alto contraste
  toggleAccessibility() {
    this.highContrastMode = !this.highContrastMode;
    // Guardar preferencia en localStorage
    localStorage.setItem('highContrastMode', this.highContrastMode.toString());
  }

  // Mostrar información de emergencia
  async showEmergencyInfo() {
    const alert = await this.alertController.create({
      header: 'Ayuda de Emergencia',
      message: 'Si necesitas ayuda inmediata, por favor llama al 911 o a tu número local de emergencias.',
      buttons: [
        {
          text: 'Llamar al 911',
          handler: () => {
            window.open('tel:911');
          }
        },
        {
          text: 'Entendido',
          role: 'cancel'
        }
      ],
      cssClass: this.highContrastMode ? 'high-contrast' : ''
    });

    await alert.present();
  }

  // Cargar preferencias al inicializar
  ionViewWillEnter() {
    const savedMode = localStorage.getItem('highContrastMode');
    if (savedMode) {
      this.highContrastMode = savedMode === 'true';
    }
  }

  // Navegación rápida para desarrollo (opcional)
  quickLogin() {
    // Solo para desarrollo - autocompleta credenciales
    this.email = 'usuario@ejemplo.com';
    this.password = 'password123';
  }
}