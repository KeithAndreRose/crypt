import { auth } from 'firebase';

export interface User {
  credential: any;
  user: any;
  uid: string,
  email: string,
  displayName: string,
  photoURL: string,
  emailVerified: boolean,
  publicKey: string;
  privateKey: string;
}
