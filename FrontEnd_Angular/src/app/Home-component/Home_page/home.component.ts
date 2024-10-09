import { Component } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-test',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  options: AnimationOptions = {
    path: 'https://lottie.host/dd1b24f8-1813-4b26-9281-735dd6c3497a/EwsvQf3cxi.json',
    autoplay: true,
    loop: true
  };
}
