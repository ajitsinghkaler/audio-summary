import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { UploadComponent } from '../components/upload.component';
import { APPWRITE } from '../helpers/appwrite';
import { AsyncPipe } from '@angular/common';
import { DateagoPipe } from '../helpers/dateago.pipe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-audio-list',
  standalone: true,
  imports: [
    ButtonModule,
    TableModule,
    DialogModule,
    UploadComponent,
    AsyncPipe,
    DateagoPipe,
    RouterLink
  ],
  template: `
    <div class="container mx-auto">
      <div class="flex justify-between m-4 items-center">
        <h1 class="text-2xl font-bold">Files List</h1>
        <button
          pButton
          pRipple
          (click)="visible = true"
          icon="pi pi-external-link"
          label="Upload"
          
        ></button>
      </div>
      <p-dialog
        header="Upload your audio"
        [(visible)]="visible"
        [modal]="true"
        [style]="{ width: '50vw' }"
        [draggable]="false"
        [resizable]="false"
        [dismissableMask]="true"
        (onHide)="files = reloadFiles()"
      >
        <app-upload />
      </p-dialog>
      <div class="card">
        <p-table
          [value]="$any((files | async)?.files)"
          [tableStyle]="{ 'min-width': '50rem' }"
          loadingIcon="pi pi-star pi-spin"
          [loading]="isLoading"
        >
          <ng-template pTemplate="header">
            <tr>
              <th>Name</th>
              <!-- <th>Summary</th> -->
              <th>Uploaded</th>
              <th>Action</th>
            </tr>
          </ng-template>
          <ng-template pTemplate="body" let-audio>
            <tr>
              <td class="cursor-pointer" routerLink="/app/summary/{{ audio.$id }}">{{ audio.name }}</td>
              <!-- <td>{{ product.name }}</td> -->
              <td class="cursor-pointer" routerLink="/app/summary/{{ audio.$id }}">{{ audio.$updatedAt | dateago }}</td>
              <td>
                <p-button
                  (click)="deleteFile(audio.$id)"
                  styleClass="p-button-danger"
                  class="ml-2"
                  ><img src="assets/delete.svg"
                /></p-button>
              </td>
            </tr>
          </ng-template>
          <ng-template pTemplate="emptymessage">
            <tr>
              <td colspan="6">There are no uploaded audios</td>
            </tr>
          </ng-template>
        </p-table>
      </div>
    </div>
  `,
  styles: [],
})
export class AudioListComponent {
  visible: boolean = false;
  isLoading: boolean = true;
  files = this.reloadFiles();
  async deleteFile(id: string) {
    this.isLoading = true;
    await APPWRITE.storage.deleteFile(APPWRITE.bucketId, id);
    this.files = this.reloadFiles();
  }

  reloadFiles() {
    this.isLoading = true;
    return APPWRITE.storage.listFiles(APPWRITE.bucketId).then((response) => {
      this.isLoading = false;
      return response;
    });
  }

}
