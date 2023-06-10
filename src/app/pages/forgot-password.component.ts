import { Component, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { APPWRITE } from '../helpers/appwrite';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [FormsModule, NgIf, InputTextModule, PasswordModule, ButtonModule],
  template: `
    <div class="flex items-center justify-center h-screen bg-gray-200">
      <form
        #forgotPasswordForm="ngForm"
        (ngSubmit)="onSubmit(forgotPasswordForm)"
        class="p-8 bg-white rounded shadow-md lg:w-1/3 md:w-1/2 w-full mx-4">
      
        <h1 class="text-2xl font-bold mb-5">Forgot Password</h1>
        <input pInputText
          [(ngModel)]="user.email"
          #email="ngModel"
          name="email"
          pattern="[a-z0-9._]+@[a-z0-9.-]+.[a-z]{2,10}"
          required
          placeholder="Email"
          class="!mb-3 w-full"
        />
        <div *ngIf="email.invalid && email.touched" class="text-red-500">
          Email is required
        </div>
        <button
          pButton
          type="submit"
          label="Reset Password"
          class="w-full !mt-3"
        ></button>
      </form>
    </div>
  `,
  styles: [],
})
export class ForgotPasswordComponent {
  user = {
    email: '',
  };
  toastr = inject(ToastrService);


  onSubmit(form: { valid: any }) {
    if (form.valid) {
      APPWRITE.account.createRecovery(this.user.email, `${environment.DOMAIN}/update-password`).then(()=>{
        this.toastr.success("Password recovery email success fully sent to your email address");
      }).catch((error) => {
        this.toastr.error("An error occured while sending the recovery email");

      })
    } else {
      console.log('Form not valid');
    }
  }
}
