import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { UploadComponent } from '../components/upload.component';
import { APPWRITE } from '../helpers/appwrite';
import { AsyncPipe } from '@angular/common';
import { DateagoPipe } from '../helpers/dateago.pipe';

@Component({
  selector: 'app-audio-list',
  standalone: true,
  imports: [ButtonModule, TableModule, DialogModule, UploadComponent, AsyncPipe, DateagoPipe],
  template: `
    <button
      pButton
      pRipple
      (click)="visible = true"
      icon="pi pi-external-link"
      label="Upload"
    ></button>
    <p-dialog
      header="Upload your audio"
      [(visible)]="visible"
      [modal]="true"
      [style]="{ width: '50vw' }"
      [draggable]="false"
      [resizable]="false"
      [dismissableMask]="true"
    >
      <app-upload/>
    </p-dialog>
    <div class="card">
      <p-table [value]="$any((files|async)?.files)" [tableStyle]="{ 'min-width': '50rem' }">
        <ng-template pTemplate="header">
          <tr>
            <th>Name</th>
            <!-- <th>Summary</th> -->
            <th>Uploaded</th>
            <th>Action</th>
          </tr>
        </ng-template>
        <ng-template pTemplate="body" let-product>
          <tr>
            <td>{{ product.name }}</td>
            <!-- <td>{{ product.name }}</td> -->
            <td>{{ product.$updatedAt|dateago }}</td>
            <td>
              <p-button (click)="deleteFile(product.$id)" styleClass="p-button-danger" class="ml-2"
                ><img src="assets/delete.svg"
              /></p-button>
            </td>
          </tr>
        </ng-template>
      </p-table>
    </div>
  `,
  styles: [],
})
export class AudioListComponent {
  visible: boolean = false;
  files = APPWRITE.storage.listFiles(APPWRITE.bucketId);
  async deleteFile(id: string) {
    await APPWRITE.storage.deleteFile(APPWRITE.bucketId,id);
  }
}
