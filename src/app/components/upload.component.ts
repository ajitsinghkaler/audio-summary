import { Component, inject } from '@angular/core';
import { FileUploadModule } from 'primeng/fileupload';
import { UploadFileEventService } from '../services/upload-file-event.service';
import { NgIf } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [FileUploadModule, NgIf],
  providers: [UploadFileEventService],
  template: `
    <!-- <div class="flex items-center justify-center h-screen bg-gray-200"> -->
    <div class="bg-white rounded">
      <form class="flex items-center justify-center w-full">
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
            <p class="text-xs text-gray-500">
              File should be MP3, MP4, WAV, WEBM, M4A, MPEG, MPEG4 and less than 7MB
            </p>
            <p
              *ngIf="uploadFileService.uploading"
              class="text-xl text-gray-500"
            >
              Uploading...
            </p>
            <!-- <p class="text-xs text-gray-500">PDF, DOC, TXT, HTML</p> -->
          </div>
          <input
            id="dropzone-file"
            type="file"
            class="hidden"
            accept="audio/mp3, audio/mp4, audio/mpeg, audio/mpeg4-generic, audio/m4a, audio/wav, audio/webm"
            maxlength="7340032"
            (change)="uploadFiles($event)"
          />
        </label>
      </form>
    </div>
    <!-- </div> -->
  `,
  styles: [],
})
export class UploadComponent {
  uploadFileService = inject(UploadFileEventService);
  toastr = inject(ToastrService);

  uploadFiles(event: Event) {
    this.uploadFileService.uploading = true;
    const target = event.target as HTMLInputElement;
    if (!target.files) return;
    const files = target.files;
    if (target.files[0].size < 7340032) {
      this.uploadFileService.uploadFile(files);
    } else {
      this.toastr.error('File size should be less than 7mb');
      this.uploadFileService.uploading = false;
      return;
    }
  }
}
