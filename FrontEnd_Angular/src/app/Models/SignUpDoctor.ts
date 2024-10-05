import {Speciality} from "../Enums/Speciality";

export interface SignUpDoctor{
  username : string,
  password: string,
  email:string,
  clinicAddress:string
  phoneNumber: string
  specialty : Speciality
  registrationNumber:string
  latitude:number
  longitude:number
}
