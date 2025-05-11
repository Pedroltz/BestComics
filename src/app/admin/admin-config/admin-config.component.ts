import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService, Admin } from '../../services/admin.service';

@Component({
  selector: 'app-admin-config',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-config.component.html',
  styleUrls: ['./admin-config.component.css']
})
export class AdminConfigComponent implements OnInit {
  admins: Admin[] = [];
  newAdmin: Admin = { id: 0, email: '', password: '' };
  editingId: number | null = null;
  editPassword: string = '';

  constructor(
    private router: Router,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    const isLogged = typeof window !== 'undefined' && localStorage.getItem('isAdminLogged') === 'true';
    if (!isLogged) {
      this.router.navigate(['/admin-login']);
    } else {
      this.loadAdmins();
    }
  }

  loadAdmins(): void {
    this.adminService.getAdmins().subscribe(admins => {
      this.admins = admins;
    });
  }

  createAdmin(): void {
    if (!this.newAdmin.email || !this.newAdmin.password) return;

    this.adminService.createAdminWithFirebase(this.newAdmin).subscribe(() => {
      this.newAdmin = { id: 0, email: '', password: '' };
      this.loadAdmins();
    });
  }

  startEdit(admin: Admin): void {
    this.editingId = admin.id;
    this.editPassword = '';
  }

  saveEdit(admin: Admin): void {
    if (!this.editPassword) return;

    const updatedAdmin: Admin = { ...admin, password: this.editPassword };
    this.adminService.updateAdmin(updatedAdmin).subscribe(() => {
      this.editingId = null;
      this.editPassword = '';
      this.loadAdmins();
    });
  }

  cancelEdit(): void {
    this.editingId = null;
    this.editPassword = '';
  }

  deleteAdmin(admin: Admin): void {
    const confirmDelete = confirm(`Tem certeza que deseja remover o admin "${admin.email}"?`);
    if (!confirmDelete) return;

    this.adminService.deleteAdmin(admin.id).subscribe(() => {
      this.loadAdmins();
    });
  }
}
