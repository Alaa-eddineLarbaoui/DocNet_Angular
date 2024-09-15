import {Speciality} from "../Enums/Speciality";



export interface HealthProfessional{
  id:number
  username:string
  password:string
  email:string
  clinicAdress:string
  phoneNumber: string
  specialty : Speciality
  registrationNumber:string
  latitude:number
  longitude:number
}















