import { Permission, Role } from 'appwrite';

export const createDocument = (userId: string) => [
  Permission.read(Role.user(userId)),
  Permission.delete(Role.user(userId)),
];
