import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(public route:ActivatedRoute,public auth:AuthService) { }

  ngOnInit() {
      //console.log(this.route.snapshot.paramMap.get('id'))
  }

  signup(signupForm:NgForm){
    console.log(signupForm.value)
    this.auth.signUp(signupForm.value.inputemail,signupForm.value.inputpassword)
    signupForm.reset()
  }
}
