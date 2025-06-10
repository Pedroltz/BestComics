import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface Genre {
  id: number;
  name: string;
}

interface MangaForm {
  name: string;
  description: string;
  author: string;
}

@Component({
  selector: 'app-admin-mangas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-mangas.component.html',
  styleUrl: './admin-mangas.component.css'
})
export class AdminMangasComponent implements OnInit {

  genres: Genre[] = [];
  selectedGenres: number[] = [];
  form: MangaForm = { name: '', description: '', author: '' };
  coverFile: File | null = null;
  errorMessage = '';
  successMessage = '';

  private mangaUrl = 'http://localhost:5282/api/manga';
  private genreUrl = 'http://localhost:5282/api/genre';

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    const isLogged = typeof window !== 'undefined' && localStorage.getItem('isAdminLogged') === 'true';
    if (!isLogged) {
      this.router.navigate(['/admin-login']);
      return;
    }
    this.loadGenres();
  }

  loadGenres(): void {
    this.http.get<Genre[]>(this.genreUrl).subscribe({
      next: res => this.genres = res,
      error: () => this.errorMessage = 'Erro ao carregar gêneros.'
    });
  }

  onCoverSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.coverFile = input.files && input.files.length > 0 ? input.files[0] : null;
  }

  onGenreToggle(id: number, checked: boolean): void {
    if (checked) {
      if (!this.selectedGenres.includes(id)) this.selectedGenres.push(id);
    } else {
      this.selectedGenres = this.selectedGenres.filter(g => g !== id);
    }
  }

  createManga(): void {
    if (!this.form.name.trim()) return;

    const data = new FormData();
    data.append('Name', this.form.name);
    data.append('Description', this.form.description);
    data.append('Author', this.form.author);
    if (this.coverFile) data.append('Cover', this.coverFile);
    for (const gid of this.selectedGenres) data.append('GenreIds', gid.toString());

    this.http.post(this.mangaUrl, data).subscribe({
      next: () => {
        this.form = { name: '', description: '', author: '' };
        this.coverFile = null;
        this.selectedGenres = [];
        this.successMessage = 'Mangá criado com sucesso!';
        this.errorMessage = '';
      },
      error: () => {
        this.errorMessage = 'Erro ao criar mangá.';
        this.successMessage = '';
      }
    });
  }
}
