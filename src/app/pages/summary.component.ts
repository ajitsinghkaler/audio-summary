import { Component, inject } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { APPWRITE } from '../helpers/appwrite';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [NgIf, AsyncPipe],
  template: `
    <div *ngIf="summary | async as summary; else loading" class=" bg-gray-200 min-h-screen">
      <div class="container  mx-auto p-4">
      <div class="p-8 bg-white rounded-lg shadow-xl mt-6">
        <h1 class="text-2xl font-bold mb-5">Summary</h1>
        <div >
          <p>
            {{ summary?.["summary"] }}
          </p>
        </div>
      </div>
      <div class="p-8 bg-white rounded-lg shadow-xl mt-6">
        <h1 class="text-2xl font-bold mb-5">Transcript</h1>
        <div >
          <p>
            {{ summary?.["transcript"] }}
          </p>
        </div>
      </div>
      </div>
    </div>
    <ng-template #loading>
      <div class="flex items-center justify-center h-screen bg-gray-200">
        <div class=" flex items-center justify-center p-8 bg-white rounded shadow-md lg:w-1/3 md:w-1/2 w-full mx-4">
          <h1 class="text-2xl font-bold">Loading...</h1>
        </div>
      </div>
    </ng-template>
  `,
  styles: [],
})
export class SummaryComponent {
  route = inject(ActivatedRoute);
  toastr = inject(ToastrService);
  summary = APPWRITE.database
    .getDocument(
      environment.APPWRITE_DATABASE_ID,
      environment.APPWRITE_COLLECTION_ID,
      this.route.snapshot.params['id']
    )
    .catch((err) => {
      this.toastr.error('An error occured while loading the summary');
    });
}
