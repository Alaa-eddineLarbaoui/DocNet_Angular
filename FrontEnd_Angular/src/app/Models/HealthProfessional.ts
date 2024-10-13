import {Speciality} from "../Enums/Speciality";


export interface HealthProfessional{
  id:number
  username:string
  password:string
  email:string
  clinicAddress:string
  phoneNumber: string
  specialty : Speciality
  registrationNumber:string
  latitude:number
  longitude:number
  price:number
  formation:string
  bio : string

}















