import { Component, Output, EventEmitter } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-sidemenu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-sidemenu.component.html',
  styleUrl: './admin-sidemenu.component.css'
})
export class AdminSidemenuComponent {
  isCollapsed = true;

  @Output() collapsedChange = new EventEmitter<boolean>();

  constructor(private router: Router) {}

  toggleMenu() {
    this.isCollapsed = !this.isCollapsed;
    this.collapsedChange.emit(this.isCollapsed);
  }

  logout() {
    localStorage.removeItem('isAdminLogged');
    this.router.navigate(['/']);
  }
}
