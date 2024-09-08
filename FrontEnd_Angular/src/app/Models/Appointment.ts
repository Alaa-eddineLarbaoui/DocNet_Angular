import {AppointmentStatus} from "../Enums/AppointmentStatus";

export interface Appointment {
  id?: number;
  date: string; // Format: "yyyy-MM-dd"
  time: string; // Format: "HH:mm:ss"
  status: AppointmentStatus;
  appointmentReason: AppointmentReason;
  note: string;
  patientId: number;
  professionalId: number;


}
