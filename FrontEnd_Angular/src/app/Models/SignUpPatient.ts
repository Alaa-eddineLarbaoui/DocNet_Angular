import {Erole} from "../Enums/Erole";

export interface SignUpPatient{
  username : string,
  password: string,
  email:string,
  role:Erole,
}
