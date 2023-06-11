import { Routes } from '@angular/router';
import { authGuard } from './gaurds/auth.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'signin',
  },
  {
    path: 'signin',
    loadComponent: () =>
      import('./pages/signin.component').then((m) => m.SigninComponent),
  },
  {
    path: 'signup',
    loadComponent: () =>
      import('./pages/signup.component').then((m) => m.SignupComponent),
  },
  {
    path: 'forgot-password',
    loadComponent: () =>
      import('./pages/forgot-password.component').then(
        (m) => m.ForgotPasswordComponent
      ),
  },
  {
    path: 'verify',
    loadComponent: () =>
      import('./pages/verify-email.component').then(
        (m) => m.VerifyEmailComponent
      ),
  },
  {
    path: 'update-password',
    loadComponent: () =>
      import('./pages/change-password.component').then(
        (m) => m.ChangePasswordComponent
      ),
  },
  {
    path: 'app',
    loadComponent: () =>
      import('./components/logged-in.component').then(
        (m) => m.LoggedInComponent
      ),
    canActivateChild: [authGuard],
    children: [
      {
        path: 'audio-list',
        loadComponent: () =>
          import('./pages/audio-list.component').then(
            (m) => m.AudioListComponent
          ),
      },
      {
        path: 'summary/:id',
        loadComponent: () =>
          import('./pages/summary.component').then(
            (m) => m.SummaryComponent
          ),
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('./pages/user-settings.component').then(
            (m) => m.UserSettingsComponent
          ),
      },
    ],
  },

  {
    path: '**',
    loadComponent: () =>
      import('./pages/not-found.component').then((m) => m.NotFoundComponent),
  },
];
