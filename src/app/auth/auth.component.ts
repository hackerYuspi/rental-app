import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  mode=true;
  constructor(public router:Router) { }

  ngOnInit() {
  }

  changeRoute(path){
    this.mode=false;
    this.router.navigateByUrl(path)
  }
}
