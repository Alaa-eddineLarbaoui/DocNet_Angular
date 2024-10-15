import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SignUpDoctor} from "../Models/SignUpDoctor";
import {Speciality} from "../Enums/Speciality";
import {Localisation} from "../Enums/Localisation";
import {Erole} from "../Enums/Erole";
import {SignupService} from "../Service/signup.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-signdoctor',
  templateUrl: './signdoctor.component.html',
  styleUrls: ['./signdoctor.component.css']
})
export class SigndoctorComponent  implements OnInit{
  local!: string[];
  localisation = Localisation;
  specialite!: string[];
  speciality = Speciality;


  signUpForm: FormGroup;
  user: SignUpDoctor = {
    username: '',
    email: '',
    password: '',
    clinicAddress: '',
    phoneNumber: '',
    specialty: Speciality.CARDIOLOGUE,
    registrationNumber: '',
    localisation: Localisation.BENI_MELLAL,
    role: Erole.DOCTOR,
  };
  message: string = '';
  redirectUrl: string = '';

  constructor(
    private fb: FormBuilder,
    private userService: SignupService,
    private router: Router,
    private route: ActivatedRoute
  ) {

    this.signUpForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      clinicAddress: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      specialty: ['', Validators.required],
      registrationNumber: ['', Validators.required],
      localisation: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.redirectUrl = params['redirectUrl'] || '/';
    });
    this.local = Object.values(this.localisation).filter((value) => typeof value === 'string');
    this.specialite = Object.values(this.speciality).filter((value) => typeof value === 'string');

  }

  onSubmit() {
    if (this.signUpForm.valid) {
      // Update the user object with form values
      this.user.username = this.signUpForm.get('username')?.value;
      this.user.email = this.signUpForm.get('email')?.value;
      this.user.password = this.signUpForm.get('password')?.value;
      this.user.clinicAddress = this.signUpForm.get('clinicAddress')?.value;
      this.user.phoneNumber = this.signUpForm.get('phoneNumber')?.value;
      this.user.specialty = this.signUpForm.get('specialty')?.value;
      this.user.registrationNumber = this.signUpForm.get('registrationNumber')?.value;
      this.user.localisation = this.signUpForm.get('localisation')?.value;

      console.log(this.user);
      this.userService.registerDoctor(this.user).subscribe(
        response => {
          console.log("Registration successful", response);

          this.message = 'Registration successful!';
          localStorage.setItem('redirectUrl', this.redirectUrl);

          // Redirect to login page after a short delay
          setTimeout(() => {
            this.router.navigate(['/login'], { queryParams: { redirectUrl: this.redirectUrl } });
          }, 1);

        },
        error => {
          console.log('Registration error: ', error);  // Display the error in the console
          this.message = 'Registration error. Please try again.';
        }
      );
    } else {
      this.message = 'Please fill in all required fields correctly.';
    }
  }

  goToLogin() {
    this.router.navigate(['/login'], { queryParams: { redirectUrl: this.redirectUrl } });
  }
}
