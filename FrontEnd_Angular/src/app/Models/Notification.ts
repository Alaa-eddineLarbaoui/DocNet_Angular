import {Patient} from "./Patient";
import {HealthProfessional} from "./HealthProfessional";

export interface Notification {
  id: number;
  message: string;
  dateSend: string; // Should be formatted as 'yyyy-MM-dd'T'HH:mm:ss'
  isSent: boolean;
  patient?: Patient;
  healthProfessional?: HealthProfessional;
}
