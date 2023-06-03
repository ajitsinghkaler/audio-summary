import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { APPWRITE } from 'src/app/helpers/appwrite';
import { ID } from 'appwrite';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, NgIf, InputTextModule, PasswordModule, ButtonModule],
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
        ></p-password>
        <div
          *ngIf="password.invalid && password.touched"
          class="text-red-500 mb-3"
        >
          Password is required
        </div>

        <input
          pInputText
          [(ngModel)]="user.repetedPassword"
          #repetedPassword="ngModel"
          name="repeat password"
          required
          type="password"
          placeholder="Repeat Password"
          class="!mb-3 w-full"
        />
        <div
          *ngIf="repetedPassword.invalid && repetedPassword.touched"
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

  onSubmit(form: NgForm) {
    if (form.valid) {
      console.log(
        'email: ' + this.user.email + ' Password: ' + this.user.password
      );
      console.log(form.value);
      APPWRITE.account.create(
        ID.unique(),
        this.user.email,
        this.user.password,
        this.user.name
      )
        .then((response) =>
          APPWRITE.account.createVerification('http://localhost:4200')
        )
        .catch((error) => {
          console.log(error);
        });
      // Add your authentication logic here
    } else {
      console.log('Form not valid');
    }
  }
}
