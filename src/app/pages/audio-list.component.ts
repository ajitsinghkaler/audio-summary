import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { UploadComponent } from '../components/upload.component';
import { APPWRITE } from '../helpers/appwrite';

@Component({
  selector: 'app-audio-list',
  standalone: true,
  imports: [ButtonModule, TableModule, DialogModule, UploadComponent],
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
      <p-table [value]="products" [tableStyle]="{ 'min-width': '50rem' }">
        <ng-template pTemplate="header">
          <tr>
            <th>Name</th>
            <th>Summary</th>
            <th>Uploaded</th>
            <th>Action</th>
          </tr>
        </ng-template>
        <ng-template pTemplate="body" let-product>
          <tr>
            <td>{{ product.code }}</td>
            <td>{{ product.name }}</td>
            <td>{{ product.category }}</td>
            <td>
              <p-button (click)="deleteFile()" styleClass="p-button-danger" class="ml-2"
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
  products = [
    {
      id: '1000',
      code: 'f230fh0g3',
      name: 'Bamboo Watch',
      description: 'Product Description',
      image: 'bamboo-watch.jpg',
      price: 65,
      category: 'Accessories',
      quantity: 24,
      inventoryStatus: 'INSTOCK',
      rating: 5,
    },
  ];
  async deleteFile() {
    await APPWRITE.storage.deleteFile(APPWRITE.bucketId,"647b20eb961c5b7e40ee");
  }
}
