import { Routes } from '@angular/router';
import { principalRoute } from './enviroments/route';
import { LoginComponent } from './features/login/login.component';

export const routes: Routes = [
  // { path: '',
  //   loadComponent: () => import('./core/components/layout/layout.component'),
  //   children: [
  //     { path: '', loadComponent: () => import('./features/home-page/home-page.component') },
  //   ]
  // },
  { path: '', component: LoginComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
