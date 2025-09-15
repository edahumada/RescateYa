import { Component } from '@angular/core';
import { IonicModule, AlertController } from '@ionic/angular';
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
  // Datos del formulario
  name = '';
  email = '';
  password = '';
  phone = '';
  address = '';
  medicalData = '';
  
  // Estados y mensajes
  acceptTerms: boolean = false;
  highContrastMode: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';

  // Contactos de emergencia por defecto
  emergencyContacts = [
    { name: 'Contacto Emergencia 1', phone: '0987654321' },
  ];

  constructor(
    private router: Router,
    private alertController: AlertController
  ) {}

  ionViewWillEnter() {
    // Cargar preferencia de alto contraste
    const savedMode = localStorage.getItem('highContrastMode');
    if (savedMode) {
      this.highContrastMode = savedMode === 'true';
    }
  }

  // Alternar modo accesibilidad
  toggleAccessibility() {
    this.highContrastMode = !this.highContrastMode;
    localStorage.setItem('highContrastMode', this.highContrastMode.toString());
  }

  // Mostrar términos y condiciones
  async showTerms(event: Event) {
    event.preventDefault();
    const alert = await this.alertController.create({
      header: 'Términos y Condiciones',
      message: `
        <p><strong>Al registrarte en RescateYa aceptas:</strong></p>
        <ul>
          <li>Utilizar el servicio solo para emergencias reales</li>
          <li>Proporcionar información verídica y actualizada</li>
          <li>Mantener la confidencialidad de tu cuenta</li>
          <li>Permitir el acceso a tu ubicación en emergencias</li>
        </ul>
      `,
      buttons: ['Entendido'],
      cssClass: this.highContrastMode ? 'high-contrast' : ''
    });

    await alert.present();
  }

  // Mostrar política de privacidad
  async showPrivacy(event: Event) {
    event.preventDefault();
    const alert = await this.alertController.create({
      header: 'Política de Privacidad',
      message: `
        <p><strong>RescateYa protege tu información:</strong></p>
        <ul>
          <li>Tus datos médicos solo se comparten con servicios de emergencia</li>
          <li>Tu ubicación solo se accede durante emergencias activas</li>
          <li>No compartimos tu información con terceros</li>
          <li>Puedes eliminar tu cuenta y datos en cualquier momento</li>
        </ul>
      `,
      buttons: ['Entendido'],
      cssClass: this.highContrastMode ? 'high-contrast' : ''
    });

    await alert.present();
  }

  // Validar formulario
  isFormValid(): boolean {
    return (
      this.name.length > 0 &&
      this.isValidEmail(this.email) &&
      this.isValidPassword(this.password) &&
      this.isValidPhone(this.phone) &&
      this.acceptTerms
    );
  }

  // Validar email
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Validar teléfono
  private isValidPhone(phone: string): boolean {
    const phoneRegex = /^[0-9+\-\s()]{8,}$/;
    return phoneRegex.test(phone);
  }

  // Validar contraseña
  private isValidPassword(password: string): boolean {
    return password.length >= 6;
  }

  // Registro de usuario
  async register() {
    // Resetear mensajes
    this.errorMessage = '';
    this.successMessage = '';

    // Validaciones
    if (!this.isFormValid()) {
      this.errorMessage = 'Por favor, completa todos los campos requeridos correctamente';
      return;
    }

    if (!this.isValidEmail(this.email)) {
      this.errorMessage = 'Por favor, ingresa un email válido';
      return;
    }

    if (!this.isValidPassword(this.password)) {
      this.errorMessage = 'La contraseña debe tener al menos 6 caracteres';
      return;
    }

    if (!this.isValidPhone(this.phone)) {
      this.errorMessage = 'Por favor, ingresa un número de teléfono válido';
      return;
    }

    if (!this.acceptTerms) {
      this.errorMessage = 'Debes aceptar los términos y condiciones';
      return;
    }

    try {
      // Crear objeto de usuario
      const user = {
        name: this.name,
        email: this.email,
        password: this.password,
        phone: this.phone,
        address: this.address,
        medicalData: this.medicalData
      };

      // Guardar en localStorage
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('emergencyContacts', JSON.stringify(this.emergencyContacts));
      localStorage.setItem('loggedIn', 'true');

      // Mensaje de éxito
      this.successMessage = '¡Cuenta creada exitosamente! Redirigiendo...';

      // Redirigir después de 2 segundos
      setTimeout(() => {
        this.router.navigate(['/home']);
      }, 2000);

    } catch (error) {
      this.errorMessage = 'Error al crear la cuenta. Intenta nuevamente.';
      console.error('Registration error:', error);
    }
  }
}