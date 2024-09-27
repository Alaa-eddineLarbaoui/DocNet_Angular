import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-doctor-details',
  templateUrl: './doctor-details.component.html',
  styleUrls: ['./doctor-details.component.css']
})
export class DoctorDetailsComponent  implements OnInit{
  idProf !:number ;
  ngOnInit(): void {
    this.idProf = +this.route.snapshot.paramMap.get('id')!;

  }

  constructor(private route: ActivatedRoute) {
  }

}
