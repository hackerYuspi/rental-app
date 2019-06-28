import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RentalService } from 'src/app/service/rental.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-addrental',
  templateUrl: './addrental.component.html',
  styleUrls: ['./addrental.component.css']
})
export class AddrentalComponent implements OnInit {
  isPropertyAdded:boolean=false
  path="NP"
  isUploaded:boolean=false

  constructor(private storage: AngularFireStorage,public rentalService:RentalService,public router:Router, public authService:AuthService) { }

  ngOnInit() {
  }

  addProperty(addRentalform:NgForm){
    
    console.log(addRentalform.value)

    let ownerEmail = this.authService.getEmail()
    let ownerName = this.authService.getName()
    let ownerContact = this.authService.getContact()
    let image = this.path

    this.rentalService.addRental({ownerEmail,image,...addRentalform.value}).then(data=>{
      console.log(data.id)
      addRentalform.reset()
      this.isPropertyAdded=true
    }).catch(err=>{
      console.log(err)
    })
  }

  selectFile(event){
    let file = event.target.files[0]
    let date = new Date()
    let unique = '/rentals/'+ date;
    (snapshot) =>  {
      // upload in progress
      file.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
    }
    (error) => {
      // upload failed
      console.log(error)
    }
    let task = this.storage.upload(unique,file).then(data=>{
      this.path=unique
      this.isUploaded=true
      console.log(data)
    }).catch(err=>{
      console.log(err)
    })
  }

}
