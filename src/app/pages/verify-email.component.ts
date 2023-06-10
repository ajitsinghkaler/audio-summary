import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { APPWRITE } from '../helpers/appwrite';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-verify-email',
  standalone: true,
  imports: [NgIf],
  template: ` <p class="mt-20 mx-6 text-center" *ngIf="verified">Your account has been verified you will automatically be redirected to sign in page</p> 
  <p class="mt-20 mx-6 text-center" *ngIf="error">Your account has already been verified or the link is expired</p>`,
})
export class VerifyEmailComponent implements OnInit {
  route = inject(ActivatedRoute);
  router = inject(Router);

  verified = false;
  error = false;

  ngOnInit(): void {
    const params = this.route.snapshot.queryParams;
    APPWRITE.account
      .updateVerification(params['userId'], params['secret'])
      .then(() => {
        this.verified = true;
        setTimeout(() => {
          this.router.navigate(['/signin']);
        }, 5000);
      }).catch((err)=>{
        this.error = true;
      });
  }
}
