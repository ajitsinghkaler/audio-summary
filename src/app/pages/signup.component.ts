import { Component, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { APPWRITE } from 'src/app/helpers/appwrite';
import { ID } from 'appwrite';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    RouterLink,
  ],
  template: `
    <div class="flex items-center justify-center h-screen bg-gray-200">
      <form
        #signUpForm="ngForm"
        (ngSubmit)="onSubmit(signUpForm)"
        class="p-8 bg-white rounded shadow-md lg:w-1/3 md:w-1/2 w-full mx-4"
      >
        <h1 class="text-2xl font-bold mb-5">Sign Up</h1>
        <input
          pInputText
          [(ngModel)]="user.name"
          #name="ngModel"
          name="name"
          required
          placeholder="Full Name"
          class="!mb-3 w-full"
        />
        <div *ngIf="name.invalid && name.touched" class="text-red-500 mb-3">
          Full Name is required
        </div>
        <input
          pInputText
          [(ngModel)]="user.email"
          #email="ngModel"
          name="email"
          type="email"
          required
          placeholder="Email"
          class="!mb-3 w-full"
        />
        <div *ngIf="email.invalid && email.touched" class="text-red-500 mb-3">
          Email is required
        </div>
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
          label="Sign Up"
          class="w-full !mt-3 p-button"
        ></button>
        <div class="mt-4 text-center">
          Already a member?
          <a class="text-blue-500" routerLink="/signin">Sign in</a>
        </div>
      </form>
    </div>
  `,
  styles: [],
})
export class SignupComponent {
  user = {
    name: '',
    email: '',
    password: '',
    repetedPassword: '',
  };
  toastr = inject(ToastrService);
  
  onSubmit(form: NgForm) {
    form.form.markAllAsTouched();
    if (this.user.password !== this.user.repetedPassword) {
      return;
    }
    if (form.valid) {
      APPWRITE.account
        .create(
          ID.unique(),
          this.user.email,
          this.user.password,
          this.user.name
        )
        .then(() =>
          APPWRITE.account.createEmailSession(
            this.user.email,
            this.user.password
          )
        )
        .then(() =>
          APPWRITE.account.createVerification(`${environment.DOMAIN}/verify`)
        )
        .then(() =>
          this.toastr.success(
            'Verification email sent to your email please verify your account',
            'Success'
          )
        )
        .catch((error) => {
          this.toastr.error('Could not create user', 'Error');
        });
      // Add your authentication logic here
    } else {
      console.log('Form not valid');
    }
  }
}
