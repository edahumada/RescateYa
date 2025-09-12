import { Component } from '@angular/core';
import { IonicModule, MenuController, IonMenu } from '@ionic/angular';
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

  async navigateTo(path: string) {
    await this.router.navigate([path]);
    this.menuCtrl.close('main-menu');
  }

  async logout() {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('user');
    localStorage.removeItem('emergencyContacts');
    await this.router.navigate(['/login']);
    this.menuCtrl.close('main-menu');
  }
}
