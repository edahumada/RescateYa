import { Component } from '@angular/core';
import { IonicModule, MenuController } from '@ionic/angular';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [IonicModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  userName: string = 'Usuario Demo';

  constructor(private menuCtrl: MenuController, private router: Router) {}

  // Método para cerrar el menú de forma segura
  private async closeMenu(): Promise<void> {
    try {
      const isOpen = await this.menuCtrl.isOpen('main-menu');
      if (isOpen) {
        await this.menuCtrl.close('main-menu');
      }
    } catch (error) {
      console.warn('Error al cerrar el menú:', error);
      // Fallback: intentar cerrar sin verificar
      this.menuCtrl.close('main-menu').catch(() => {});
    }
  }

  async navigateTo(path: string) {
    await this.router.navigate([path]);
    await this.closeMenu();
  }

  async logout() {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('user');
    localStorage.removeItem('emergencyContacts');
    await this.router.navigate(['/login']);
    await this.closeMenu();
  }

  openGoogleDoc() {
    window.open('https://docs.google.com/document/d/1KQMwzkAdlrMgBLNoKUvXo4YmRsm8f3Ps2RKN6BXt3fs/edit?usp=sharing', '_blank');
    this.closeMenu();
  }

  // Método opcional para alternar el menú
  toggleMenu() {
    this.menuCtrl.toggle('main-menu');
  }
}