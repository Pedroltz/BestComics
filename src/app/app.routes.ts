import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NewComponent } from './pages/new/new.component';
import { GenresComponent } from './pages/genres/genres.component';
import { RankingComponent } from './pages/ranking/ranking.component';
import { Erro404Component } from './pages/erro404/erro404.component';
import { AdminLoginComponent } from './auth/admin-login/admin-login.component';
import { AdminMangasComponent } from './admin/admin-mangas/admin-mangas.component';
import { AdminConfigComponent } from './admin/admin-config/admin-config.component';

export const routes: Routes = [
    { path: "", component: HomeComponent },
    { path: "home", component: HomeComponent },
    { path: "new", component: NewComponent },
    { path: "genres", component: GenresComponent },
    { path: "ranking", component: RankingComponent },
    { path: "admin-login", component: AdminLoginComponent },
    { path: "admin-manga", component: AdminMangasComponent },
    { path: "admin-config", component: AdminConfigComponent},
    { path: "**", component: Erro404Component }
];
