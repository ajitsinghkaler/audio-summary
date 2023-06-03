import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SigninComponent } from "./pages/signin.component";
import { SignupComponent } from "./pages/signup.component";
import { ForgotPasswordComponent } from "./pages/forgot-password.component";
import { UploadComponent } from "./components/upload.component";
import { AudioListComponent } from "./pages/audio-list.component";
import { UserSettingsComponent } from "./pages/user-settings.component";
import { APPWRITE } from './helpers/appwrite';

@Component({
    selector: 'app-root',
    standalone: true,
    template: `
  <router-outlet></router-outlet>
  <button (click)="logout()">Logout</button>
  `,
    imports: [RouterOutlet]
})
export class AppComponent {
  title = 'audio-summary';
  files = APPWRITE.storage.listFiles(APPWRITE.bucketId);

  logout() {
    this.files.then(res => {console.log(res);})
    console.log(this.files);
    // APPWRITE.account.deleteSession('current');

  }
}
