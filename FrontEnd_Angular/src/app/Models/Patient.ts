export interface Patient {
  id: number;
  username: string;
  password: string;
  email: string;
  address: string;
  birthDate: Date;
  gender: string;
  notifications?: Notification[];
}
