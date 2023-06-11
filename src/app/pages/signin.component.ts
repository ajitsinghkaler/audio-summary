import { Component, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { APPWRITE } from 'src/app/helpers/appwrite';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [FormsModule, NgIf, InputTextModule, ButtonModule, RouterLink],
  template: `
    <div class="flex items-center justify-center h-screen bg-gray-200">
      <form
        #signInForm="ngForm"
        (ngSubmit)="onSubmit(signInForm)"
        class="p-8 bg-white rounded shadow-md lg:w-1/3 md:w-1/2 w-full mx-4"
      >
        <h1 class="text-2xl font-bold mb-5">Sign In</h1>
        <input
          pInputText
          [(ngModel)]="user.email"
          #email="ngModel"
          name="email"
          type="email"
          pattern="[a-z0-9._]+@[a-z0-9.-]+.[a-z]{2,10}"
          required
          placeholder="Email"
          class="!mb-3 w-full"
        />
        <div *ngIf="email.invalid && email.touched" class="text-red-500 mb-3">
          Email is required
        </div>
        <input
          pInputText
          [(ngModel)]="user.password"
          #password="ngModel"
          name="password"
          required
          placeholder="Password"
          class="!mb-3 w-full"
          type="password"
        />
        <div
          *ngIf="password.invalid && password.touched"
          class="text-red-500 mb3"
        >
          Password is required
        </div>

        <button
          pButton
          type="submit"
          label="Sign In"
          class="w-full !mt-3 p-button"
        ></button>
        <div class="mt-4 text-center">
          Not a member?
          <a class="text-blue-500" routerLink="/signup">Sign up</a>
        </div>
        <div class="text-center mt-4">
          <a class="text-blue-500" routerLink="/forgot-password"
            >Forgot Password</a
          >
        </div>
      </form>
    </div>
  `,
  styles: [],
})
export class SigninComponent {
  user = {
    email: '',
    password: '',
  };
  router = inject(Router);

  ngOnInit(): void {
    APPWRITE.account
      .getSession('current')
      .then(() => this.router.navigate(['/app/audio-list']))
      .catch(() => {
        console.log('no session');
      });
  }

  onSubmit(form: { valid: any; form: { markAllAsTouched: () => void } }) {
    form.form.markAllAsTouched();
    if (form.valid) {
      APPWRITE.account
        .createEmailSession(this.user.email, this.user.password)
        .then(
          (response) => {
            this.router.navigate(['/app/audio-list']);
          },
          (error) => {
            console.log(error);
          }
        );

      // Add your authentication logic here
    } else {
      console.log('Form not valid');
    }
  }
}
