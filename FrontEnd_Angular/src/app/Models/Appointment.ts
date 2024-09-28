import {AppointmentStatus} from "../Enums/AppointmentStatus";
import {AppointmentReason} from "../Enums/AppointmentReason";

export interface Appointment {
  id?: number;
  date: string; // Format: "yyyy-MM-dd"
  time: string; // Format: "HH:mm:ss"
  status: AppointmentStatus;
  appointment_Reason: AppointmentReason;
  note: string;
  patientId: number;
  professionalId: number;


}
