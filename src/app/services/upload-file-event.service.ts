import { Injectable, inject } from '@angular/core';
import { APPWRITE } from '../helpers/appwrite';
import { ID, Models } from 'appwrite';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';

export interface UploadEvent {
  $id: string;
  bucketId: string;
  $createdAt: Date;
  $updatedAt: Date;
  $permissions: string[];
  name: string;
  signature: string;
  mimeType: string;
  sizeOriginal: number;
  chunksTotal: number;
  chunksUploaded: number;
}

@Injectable()
export class UploadFileEventService {
  toastr = inject(ToastrService);
  uploading = false;
  uploadEvent = APPWRITE.client.subscribe<UploadEvent>('files', (response) => {
    if (
      response.events.includes(
        `buckets.${environment.APPWRITE_BUCKET_ID}.files.*.create`
      ) &&
      response.payload.chunksTotal === response.payload.chunksUploaded
    ) {
      this.transcribeAudio(response);
    }
  });

  uploadFile(files: FileList) {
    APPWRITE.storage
      .createFile(APPWRITE.bucketId, ID.unique(), files[0])
      .catch((error) => {
        this.toastr.error('An error occured while uploading file');
        this.uploading = false;
      });
  }

  transcribeAudio(response: { payload: UploadEvent }) {
    APPWRITE.functions
      .createExecution(
        environment.TRANSCRIBE_AUDIO_ID,
        JSON.stringify({
          fileId: response.payload.$id,
          bucketId: response.payload.bucketId,
          name: response.payload.name,
        })
      )
      .then((response) => this.addTranscriptsToDb(response ))
      .catch((error) => {
        this.toastr.error('An error occured while transcribing file');
        this.uploading = false;
      });
  }

  addTranscriptsToDb(data: Models.Execution) {
    const response = JSON.parse(data.response);
    APPWRITE.database
      .createDocument(
        environment.APPWRITE_DATABASE_ID,
        environment.APPWRITE_COLLECTION_ID,
        response.fileId,
        {
          transcript: response.transcript,
          summary: response.summary,
        }
      )
      .then((response) => {
        this.uploadEvent(), this.toastr.success('File Uploaded');
        this.uploading = false;
      })
      .catch((error) => {
        this.toastr.error('An error occured while uploading file');
        this.uploading = false;
      });
  }
}
