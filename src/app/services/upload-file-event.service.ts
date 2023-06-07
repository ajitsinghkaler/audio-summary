import { Injectable } from '@angular/core';
import { APPWRITE } from '../helpers/appwrite';
import { ID, Models } from 'appwrite';
import { environment } from 'src/environments/environment';

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
      .catch((error) => console.log(error));
  }

  transcribeAudio(response: { payload: UploadEvent }) {
    APPWRITE.functions.createExecution(
      environment.TRANSCRIBE_AUDIO_ID,
      JSON.stringify({
        fileId: response.payload.$id,
        bucketId: response.payload.bucketId,
        name: response.payload.name,
      })
    ).then((response)=>this.addTranscriptsToDb(response));
  }

  addTranscriptsToDb(data: Models.Execution){
    const response = JSON.parse(data.response)
    APPWRITE.database.createDocument(environment.APPWRITE_DATABASE_ID, environment.APPWRITE_COLLECTION_ID, ID.unique(),{
      file_id: response.fileId,
      transcript: response.transcript,
      summary: response.summary,
    })
  }
}
