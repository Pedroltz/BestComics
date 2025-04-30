import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-genres',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-genres.component.html',
  styleUrl: './admin-genres.component.css'
})
export class AdminGenresComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit(): void {
    const isBrowser = typeof window !== 'undefined';
    const isLogged = isBrowser && localStorage.getItem('isAdminLogged') === 'true';

    if (!isLogged) {
      this.router.navigate(['/admin-login']);
    }
  }
}
