import { Component, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { APPWRITE } from '../helpers/appwrite';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-user-settings',
  standalone: true,
  imports: [FormsModule, NgIf, InputTextModule, PasswordModule, ButtonModule],
  template: `
    <div class="flex items-center justify-center h-screen bg-gray-200 ">
      <form
        #settingsForm="ngForm"
        (ngSubmit)="onSubmit(settingsForm)"
        class="p-8 bg-white rounded shadow-md lg:w-1/3 md:w-1/2 w-full mx-4 -mt-20"
      >
        <h1 class="text-2xl font-bold mb-5">User Settings</h1>

        <div class="rounded-md">
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
            disabled
            placeholder="Email"
            class="!mb-3 w-full"
          />

          <p-password
            [(ngModel)]="user.password"
            #password="ngModel"
            name="password"
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
        </div>

        <div>
          <button
            pButton
            type="submit"
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save Settings
          </button>
        </div>
      </form>
    </div>
  `,
  styles: [],
})
export class UserSettingsComponent {
  auth = inject(AuthService);
  getUser = this.auth.getCurrentUser.then((user) => {
    this.user.name = user.name;
    this.user.email = user.email;
  });
  toastr = inject(ToastrService);
  user = {
    email: '',
    name: '',
    password: '',
  };

  async onSubmit(form: { valid: any }) {
    if (form.valid) {
      await APPWRITE.account.updateName(this.user.name);
      if (this.user.password) {
        await APPWRITE.account.updatePassword(this.user.password);
      }
      this.toastr.success('Settings updated successfully');
      // Add your authentication logic here
    } else {
      console.log('Form not valid');
    }
  }
}
