export interface IUser {
  email: string;
  password: string;
  returnSecureToken?: boolean;
}

export interface IFirebaseAuthResponse {
  idToken: string;
  expiresIn: string;
}

export interface IPost {
  id?: string;
  title: string;
  text: string;
  author: string;
  date: Date;
}

export interface IFirebaseCreateResponse {
  name: string;
}
