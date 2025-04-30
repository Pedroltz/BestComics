import { Component } from '@angular/core';
import { AdminService, Admin } from '../../services/admin.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private adminService: AdminService, private router: Router) {}

  login() {
    this.adminService.getAdmins().subscribe((admins: Admin[]) => {
      const admin = admins.find(a => a.email === this.email && a.password === this.password);
      if (admin) {
        localStorage.setItem('isAdminLogged', 'true');
        this.router.navigate(['/admin-config']);
      } else {
        this.errorMessage = 'Email ou senha incorretos!';
      }
    }, error => {
      this.errorMessage = 'Erro ao conectar com servidor.';
    });
  }
}
