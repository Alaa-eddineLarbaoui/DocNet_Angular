import {AppointmentStatus} from "../Enums/AppointmentStatus";
import {AppointmentReason} from "../Enums/AppointmentReason";
import {Patient} from "./Patient";
import {HealthProfessional} from "./HealthProfessional";

export interface Appointment {
  id?: number;
  date: string; // Format: "yyyy-MM-dd"
  time: string; // Format: "HH:mm:ss"
  status: AppointmentStatus;
  appointmentReason: AppointmentReason;
  note: string;
  notificationEnvoyee:boolean;
  patient:Patient;
  professional:HealthProfessional;




}
