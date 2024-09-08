export interface Availability {
  id: number;
  date: string; // Format: "yyyy-MM-dd"
  startTime: string; // Format: "HH:mm:ss"
  endTime: string; // Format: "HH:mm:ss"
  professionalId: number;
  available: boolean;
}
