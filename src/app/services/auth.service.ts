import { Injectable } from '@angular/core';
import { APPWRITE } from '../helpers/appwrite';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  getCurrentUser = APPWRITE.account.get();
}
