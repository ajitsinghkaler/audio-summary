import { Account, Client } from 'appwrite';
import { environment } from 'src/environments/environment';

export const APPWRITE_CLIENT = new Client()
  .setEndpoint(environment.APPWRITE_ENDPOINT) // Your API Endpoint
  .setProject(environment.APPWRITE_PROJECT_ID);

export const APPWRITE_ACCOUNT = new Account(APPWRITE_CLIENT);