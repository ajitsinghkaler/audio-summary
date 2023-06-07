import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
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

  logout() {
    // this.files.then(res => {console.log(res);})
    // console.log(this.files);
    APPWRITE.account.deleteSession('current');

  }
}
