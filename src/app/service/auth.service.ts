import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userDetails=null
  constructor(public FirebaseAuth:AngularFireAuth,public router:Router) {
      this.FirebaseAuth.authState.subscribe(user=>{
         if(user){
           this.userDetails=user;
         }
      })
   }
   

   logIn(email,password){
    this.FirebaseAuth.auth.signInWithEmailAndPassword(email,password).then(data=>{
      this.userDetails=data 
      console.log(data)
       this.router.navigateByUrl('/home')
    }).catch(err=>{
      alert(err)
      console.log(err)
    })
  }

  signUp(email,password,name,contact){
    this.FirebaseAuth.auth.createUserWithEmailAndPassword(email,password).then(data=>{
      this.userDetails=data  
      console.log(data)
      this.router.navigateByUrl('/home')
    }).catch(err=>{
      alert(err)
      console.log(err)
    })
  }

  isAuthenticated(){
    if(this.userDetails){
      return true;
    }
    else{
      return false;
    }
  }

  getEmail(){
    return this.userDetails.user.email
  }
  
  getName(){
    return this.userDetails.user.name
  }

  getContact(){
    return this.userDetails.user.contact
  }

}
