import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface Genre {
  id: number;
  name: string;
}

@Component({
  selector: 'app-admin-genres',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-genres.component.html',
  styleUrl: './admin-genres.component.css'
})
export class AdminGenresComponent implements OnInit {
  genres: Genre[] = [];
  newGenreName: string = '';
  editingId: number | null = null;
  editName: string = '';
  errorMessage: string = '';

  private apiUrl = 'http://localhost:5282/api/genre';

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    const isLogged = typeof window !== 'undefined' && localStorage.getItem('isAdminLogged') === 'true';
    if (!isLogged) {
      this.router.navigate(['/admin-login']);
    } else {
      this.loadGenres();
    }
  }

  loadGenres(): void {
    this.http.get<Genre[]>(this.apiUrl).subscribe({
      next: res => this.genres = res,
      error: () => this.errorMessage = 'Erro ao carregar gêneros.'
    });
  }

  createGenre(): void {
    if (!this.newGenreName.trim()) return;

    const body = { name: this.newGenreName.trim() };

    this.http.post<Genre>(this.apiUrl, body).subscribe({
      next: () => {
        this.newGenreName = '';
        this.loadGenres();
      },
      error: err => {
        console.error(err);
        this.errorMessage = 'Erro ao criar gênero.';
      }
    });
  }

  startEdit(genre: Genre): void {
    this.editingId = genre.id;
    this.editName = genre.name;
  }

  cancelEdit(): void {
    this.editingId = null;
    this.editName = '';
  }

  saveEdit(genre: Genre): void {
    if (!this.editName.trim()) return;

    const updated = { id: genre.id, name: this.editName.trim() };

    this.http.put(`${this.apiUrl}/${genre.id}`, updated).subscribe({
      next: () => {
        this.cancelEdit();
        this.loadGenres();
      },
      error: () => this.errorMessage = 'Erro ao atualizar gênero.'
    });
  }

  deleteGenre(genre: Genre): void {
    if (!confirm(`Excluir gênero "${genre.name}"?`)) return;

    this.http.delete(`${this.apiUrl}/${genre.id}`).subscribe({
      next: () => this.loadGenres(),
      error: () => this.errorMessage = 'Erro ao excluir gênero.'
    });
  }
}
