import { Account, Client, Storage } from 'appwrite';
import { environment } from 'src/environments/environment';

const APPWRITE_CLIENT = new Client()
  .setEndpoint(environment.APPWRITE_ENDPOINT) // Your API Endpoint
  .setProject(environment.APPWRITE_PROJECT_ID);

const APPWRITE_ACCOUNT = new Account(APPWRITE_CLIENT);

const APPWRITE_STORAGE = new Storage(APPWRITE_CLIENT);

export const APPWRITE= {
  client: APPWRITE_CLIENT,
  account:APPWRITE_ACCOUNT,
  storage:APPWRITE_STORAGE,
  bucketId: environment.APPWRITE_BUCKET_ID,
}