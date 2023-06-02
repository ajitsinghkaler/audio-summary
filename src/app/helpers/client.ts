import { Client } from 'appwrite';
import { environment } from 'src/environments/environment';

export const client = new Client()
  .setEndpoint(environment.APPWRITE_ENDPOINT) // Your API Endpoint
  .setProject(environment.APPWRITE_PROJECT_ID);
