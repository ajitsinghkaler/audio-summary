import { Routes } from '@angular/router';

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
    children: [
      {
        path: 'audio-list',
        loadComponent: () =>
          import('./pages/audio-list.component').then(
            (m) => m.AudioListComponent
          ),
      },
      {
        path: 'summary-list',
        loadComponent: () =>
          import('./pages/summary-list.component').then(
            (m) => m.SummaryListComponent
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
