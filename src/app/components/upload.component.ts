import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnDestroy, inject } from '@angular/core';
import { FileUploadModule } from 'primeng/fileupload';
import { UploadFileEventService } from '../services/upload-file-event.service';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [FileUploadModule, HttpClientModule],
  providers: [HttpClient, UploadFileEventService],
  template: `
    <!-- <div class="flex items-center justify-center h-screen bg-gray-200"> -->
    <div class="bg-white rounded">
      <div class="flex items-center justify-center w-full">
        <label
          for="dropzone-file"
          class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50"
        >
          <div class="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              class="w-10 h-10 mb-3 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              ></path>
            </svg>
            <p class="mb-2 text-sm text-gray-500">
              <span class="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <!-- <p class="text-xs text-gray-500">PDF, DOC, TXT, HTML</p> -->
          </div>
          <input
            id="dropzone-file"
            type="file"
            class="hidden"
            (change)="uploadFiles($event)"
          />
        </label>
      </div>
    </div>
    <!-- </div> -->
  `,
  styles: [],
})
export class UploadComponent implements OnDestroy {
  uploadFileService = inject(UploadFileEventService);

  uploadFiles(event: Event) {
    const target = event.target as HTMLInputElement;
    if (!target.files) return;
    const files = target.files;
    this.uploadFileService.uploadFile(files);
  }

  ngOnDestroy() {
    this.uploadFileService.uploadEvent();
  }
}
