import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Erole} from "../Enums/Erole";
import {LoginRequest} from "../Models/LoginRequest";
import {LoginService} from "../Service/login.service";
import {jwtDecode} from "jwt-decode";






@Component({
  selector: 'app-login',
  templateUrl:'./login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  loginForm!:FormGroup
  username!:string

  constructor(private srv:LoginService,private fb:FormBuilder,private route:Router , private router: Router){}
  ngOnInit(): void {

    this.loginForm=this.fb.group({
      username:'',
      password:''
    })


  }

  onSubmit() {
    if (this.loginForm.valid) {
      const person:LoginRequest  = this.loginForm.value;
      this.srv.Login(person).subscribe({
        next: (res: any) => {

          localStorage.setItem('jwtData', JSON.stringify(res));

          const decodedToken: any = jwtDecode(res.token);
          console.log('Decoded Token:', decodedToken);

          const roleMap = decodedToken.role
          console.log("dkheeeeeeeeeeeeeel")
          console.log(decodedToken)
          console.log(roleMap)
          if (decodedToken.role.includes(Erole.ADMIN)) {
            this.router.navigate(['/calendar']);
          }else if (decodedToken.role.includes(Erole.DOCTOR)) {
            this.router.navigate(['/notFound']);
          }
          else if (decodedToken.role.includes(Erole.PATIENT)){
            console.log("patienttt")
            this.router.navigate(['/filter']);
          }
        },
        error: (err) => {
          alert(this.username = 'Login failed , try again.');
          console.error('Login error:', err);
        }
      });
    } else {
      this.username = 'all required fields.';
      console.log('Form is invalid.');
    }
  }
}
