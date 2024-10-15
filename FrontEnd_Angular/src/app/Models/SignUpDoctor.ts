import {Speciality} from "../Enums/Speciality";
import {Localisation} from "../Enums/Localisation";
import {Erole} from "../Enums/Erole";

export interface SignUpDoctor{
  username : string,
  password: string,
  email:string,
  clinicAddress:string
  phoneNumber: string
  specialty : Speciality
  registrationNumber:string
  localisation :Localisation;
  role:Erole,

}
