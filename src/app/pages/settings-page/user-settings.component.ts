import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-user-settings',
  standalone: true,
  imports: [FormsModule, NgIf, InputTextModule, PasswordModule, ButtonModule],
  template: `
    <div class="flex items-center justify-center h-screen bg-gray-200">
    <form #settingsForm="ngForm" (ngSubmit)="onSubmit(settingsForm)" class="space-y-6 p-8 bg-white rounded shadow-md lg:w-1/3 md:w-1/2 w-full mx-4 ">
    <h1 class="text-2xl font-bold mb-5">User Settings</h1>

      <div class="rounded-md -space-y-px">
        <div>
          <label for="email" class="sr-only">Email</label>
          <input pInputText id="email" name="email" type="email" required [(ngModel)]="user.email" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Email">
        </div>
        <div class="!mt-4">
          <label for="name" class="sr-only">Name</label>
          <input pInputText id="name" name="name" type="text" required [(ngModel)]="user.name" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Name">
        </div>
        <div class="!mt-4">
          <label for="password" class="sr-only">Password</label>
          <input pPassword id="password" name="password" type="password" required [(ngModel)]="user.password" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Password">
        </div>
      </div>

      <div>
        <button pButton type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Save Settings
        </button>
      </div>
    </form>
</div>

  `,
  styles: [
  ]
})
export class UserSettingsComponent {
  user = {
    email: '',
    name: '',
    password: ''
  };

  onSubmit(form: { valid: any }) {
    if (form.valid) {
      console.log(
        'Username: ' + this.user.email + ' Password: ' + this.user.password
      );
      // Add your authentication logic here
    } else {
      console.log('Form not valid');
    }
  }
}
