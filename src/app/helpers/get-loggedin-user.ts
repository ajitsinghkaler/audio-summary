import { Models } from "appwrite";
import { APPWRITE } from "./appwrite";

export const getCurrentUser: Promise<Models.User<{$id: string}>> = APPWRITE.account.get();