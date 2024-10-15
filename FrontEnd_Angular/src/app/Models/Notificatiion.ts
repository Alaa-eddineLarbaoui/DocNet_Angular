import {Patient} from "./Patient";
import {HealthProfessional} from "./HealthProfessional";

export interface Notificatiion {
  id: number;
  message: string;
  dateSend: string; // yyyy-MM-dd'T'HH:mm:ss
  isSent: boolean;
  patient?: Patient;
  healthProfessional?: HealthProfessional;
}
