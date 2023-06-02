import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';


@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [FormsModule, NgIf, InputTextModule, PasswordModule, ButtonModule],
  template: `
    <div class="flex items-center justify-center h-screen bg-gray-200">
      <form
        #signInForm="ngForm"
        (ngSubmit)="onSubmit(signInForm)"
        class="p-8 bg-white rounded shadow-md lg:w-1/3 md:w-1/2 w-full mx-4">
        <h1 class="text-2xl font-bold mb-5">Sign In</h1>
        <input
          pInputText
          [(ngModel)]="user.username"
          #username="ngModel"
          name="username"
          required
          placeholder="Username"
          class="!mb-3 w-full"
        />
        <div *ngIf="username.invalid && username.touched" class="text-red-500 mb-3">
          Username is required
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
        ></p-password>
        <div *ngIf="password.invalid && password.touched" class="text-red-500 mb3">
          Password is required
        </div>
        <button
          pButton
          type="submit"
          label="Sign In"
          class="w-full !mt-3 p-button"
        ></button>
      </form>
    </div>
  `,
  styles: [],
})
export class SigninComponent {
  user = {
    username: '',
    password: '',
  };

  onSubmit(form: { valid: any }) {
    if (form.valid) {
      console.log(
        'Username: ' + this.user.username + ' Password: ' + this.user.password
      );
      // Add your authentication logic here
    } else {
      console.log('Form not valid');
    }
  }
}