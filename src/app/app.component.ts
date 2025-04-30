import { Component } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AdminSidemenuComponent } from './components/admin-sidemenu/admin-sidemenu.component';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    HeaderComponent,
    FooterComponent,
    AdminSidemenuComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'WebComic';

  // true para qualquer rota que comece com /admin
  isAdminRoute = false;
  // true apenas se for exatamente /admin-login
  isAdminLogin = false;

  // só mostramos o sidebar quando for rota admin e NÃO for login
  get showAdminSidebar() {
    return this.isAdminRoute && !this.isAdminLogin;
  }

  // estado do side‐menu (true=recolhido / false=expandido)
  collapsed = true;

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd)
    ).subscribe((e: NavigationEnd) => {
      const url = e.urlAfterRedirects.split('?')[0].split('#')[0];

      this.isAdminRoute = url.startsWith('/admin');
      this.isAdminLogin = url === '/admin-login';
    });
  }

  // handler do evento emitido pelo AdminSidemenuComponent
  onCollapsedChange(state: boolean) {
    this.collapsed = state;
  }
}
