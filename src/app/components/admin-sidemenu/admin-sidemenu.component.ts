import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

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

  toggleMenu(): void {
    this.isCollapsed = !this.isCollapsed;
    this.collapsedChange.emit(this.isCollapsed);
  }

  logout(): void {
    localStorage.removeItem('isAdminLogged');
    localStorage.removeItem('token'); 
    this.router.navigate(['/']);
  }
}
