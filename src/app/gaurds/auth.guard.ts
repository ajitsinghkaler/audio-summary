import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const toastr = inject(ToastrService);
  const authService = inject(AuthService);
  return authService
    .getCurrentUser.then(() => true)
    .catch(() =>
      router.navigate(['/signin']).then((value) => {
        toastr.error('Please sign in to continue');
        return value;
      })
    );
};
