import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-banners',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-banners.component.html',
  styleUrl: './admin-banners.component.css'
})
export class AdminBannersComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit(): void {
    const isBrowser = typeof window !== 'undefined';
    const isLogged = isBrowser && localStorage.getItem('isAdminLogged') === 'true';

    if (!isLogged) {
      this.router.navigate(['/admin-login']);
    }
  }
}
