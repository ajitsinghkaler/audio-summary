import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-audio-list',
  standalone: true,
  imports: [ButtonModule, TableModule],
  template: `
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
              <p-button styleClass="p-button-danger" class="ml-2"
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
}
