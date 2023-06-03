import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SigninComponent } from "./pages/signin.component";
import { SignupComponent } from "./pages/signup.component";
import { ForgotPasswordComponent } from "./pages/forgot-password.component";
import { UploadComponent } from "./components/upload.component";
import { AudioListComponent } from "./pages/audio-list.component";
import { UserSettingsComponent } from "./pages/user-settings.component";

@Component({
    selector: 'app-root',
    standalone: true,
    template: `
  <router-outlet></router-outlet>
  `,
    imports: [RouterOutlet]
})
export class AppComponent {
  title = 'audio-summary';
}
