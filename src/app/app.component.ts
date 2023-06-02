import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SigninComponent } from "./pages/signin-page/signin.component";
import { SignupComponent } from "./pages/signup-page/signup.component";
import { ForgotPasswordComponent } from "./pages/signin-page/forgot-password.component";
import { UploadComponent } from "./pages/audio-list-page/upload.component";
import { AudioListComponent } from "./pages/audio-list-page/audio-list.component";
import { UserSettingsComponent } from "./pages/settings-page/user-settings.component";

@Component({
    selector: 'app-root',
    standalone: true,
    template: `
  <router-outlet></router-outlet>
  <app-signin/>  
  <app-signup/>
  <app-forgot-password/>
  <app-upload/>
  <app-audio-list/>
  <app-user-settings/>
  `,
    imports: [RouterOutlet, SigninComponent, SignupComponent, ForgotPasswordComponent, UploadComponent, AudioListComponent, UserSettingsComponent]
})
export class AppComponent {
  title = 'audio-summary';
}
