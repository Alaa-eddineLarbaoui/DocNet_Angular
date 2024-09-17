import {Speciality} from "../Enums/Speciality";


export interface HealthProfessional{
  id:number
  username:string
  password:string
  email:string
  clinicAddress:string
  phoneNumber: string
  speciality : Speciality
  registrationNumber:string
  latitude:number
  longitude:number
}















