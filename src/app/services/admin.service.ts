import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Admin {
  id: number;
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'http://localhost:5282/api/Admin';
  private authUrl = 'http://localhost:5282/api/Auth';

  constructor(private http: HttpClient) {}

  getAdmins(): Observable<Admin[]> {
    return this.http.get<Admin[]>(this.apiUrl);
  }

  createAdmin(admin: Admin): Observable<Admin> {
    return this.http.post<Admin>(this.apiUrl, admin);
  }

  createAdminWithFirebase(admin: Admin): Observable<Admin> {
    return this.http.post<Admin>(`${this.apiUrl}/create-with-firebase`, admin);
  }

  updateAdmin(admin: Admin): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${admin.id}`, admin);
  }

  deleteAdmin(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  loginAdmin(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.authUrl}/login-admin`, { email, password });
  }
}
