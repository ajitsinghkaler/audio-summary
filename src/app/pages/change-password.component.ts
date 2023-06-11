import { Component, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { APPWRITE } from 'src/app/helpers/appwrite';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    PasswordModule,
    ButtonModule,
  ],
  template: `
    <div class="flex items-center justify-center h-screen bg-gray-200">
      <form
        #passwordChange="ngForm"
        (ngSubmit)="onSubmit(passwordChange)"
        class="p-8 bg-white rounded shadow-md lg:w-1/3 md:w-1/2 w-full mx-4"
      >
        <h1 class="text-2xl font-bold mb-5">Change Password</h1>
        <p-password
          [(ngModel)]="user.password"
          #password="ngModel"
          name="password"
          required
          placeholder="Password"
          class="block w-full"
          styleClass="w-full"
          inputStyleClass="!mb-3 w-full"
          minlength="8"
        >
          <ng-template pTemplate="header">
            <h6>Pick a password</h6>
          </ng-template>
          <ng-template pTemplate="footer">
            <p class="mt-2">Requirements</p>
            <ul class="pl-2 ml-2 mt-0" style="line-height: 1.5">
              <li>Minimum 8 characters</li>
            </ul>
          </ng-template></p-password
        >
        <div
          *ngIf="password.invalid && password.touched"
          class="text-red-500 mb-3"
        >
          Password is required
        </div>

        <input
          pPassword
          [(ngModel)]="user.repetedPassword"
          #repetedPassword="ngModel"
          name="repeat password"
          required
          [feedback]="false"
          type="password"
          placeholder="Repeat Password"
          class="!mb-3 w-full"
        />
        <div
          *ngIf="
            (repetedPassword.invalid && repetedPassword.touched) ||
            (user.password !== user.repetedPassword && repetedPassword.touched)
          "
          class="text-red-500 mb-3"
        >
          Passwords must match
        </div>
        <button
          pButton
          type="submit"
          label="Change password"
          class="w-full !mt-3 p-button"
        ></button>
      </form>
    </div>
  `,
  styles: [],
})
export class ChangePasswordComponent {
  user = {
    password: '',
    repetedPassword: '',
  };
  toastr = inject(ToastrService);
  route = inject(ActivatedRoute);
  router = inject(Router);

  params: Params | undefined;
  ngOnInit(): void {
    this.params = this.route.snapshot.queryParams;
  }

  onSubmit(form: NgForm) {
    form.form.markAllAsTouched();
    if (this.user.password !== this.user.repetedPassword) {
      return;
    }
    if (form.valid) {
      APPWRITE.account
        .updateRecovery(
          this.params?.['userId'],
          this.params?.['secret'],
          this.user.password,
          this.user.repetedPassword
        )
        .then(() => {
          this.toastr.success(
            'Your password has been updated. You will be redirected to login page.',
            'Success'
          );
          setTimeout(() => {
            this.router.navigate(['/signin']);
          }, 5000);
        })
        .catch((error) => {
          this.toastr.error('Could not update password', 'Error');
        });
      // Add your authentication logic here
    } else {
      console.log('Form not valid');
    }
  }
}
