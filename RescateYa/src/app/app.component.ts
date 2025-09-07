import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { IonicModule, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [IonicModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private router: Router, private menu: MenuController) {}

  async closeMenu() {
    await this.menu.close('main-menu');
  }

  async logout() {
    localStorage.removeItem('loggedIn');
    await this.menu.close('main-menu');
    this.router.navigate(['/login']);
  }
}
