import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { EnquiryService } from 'src/app/service/enquiry.service';
import { NgForm } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-singleproperty',
  templateUrl: './singleproperty.component.html',
  styleUrls: ['./singleproperty.component.css']
})
export class SinglepropertyComponent implements OnInit {
  @Input('property') property
  showForm:boolean=false
  image:any
  constructor(public authService:AuthService, public enquiryService:EnquiryService,public storage:AngularFireStorage) { }

  ngOnInit() {
    this.image = this.storage.ref(this.property.image).getDownloadURL()
  }

  sendEnquiry(enquiryForm:NgForm){
    console.log(enquiryForm.value)
    let title = this.property.title
    let timestamp = new Date()
    let id = this.property.id
    let ownerEmail = this.property.ownerEmail
    let email = this.authService.getEmail()
    this.enquiryService.addEnquiry({ownerEmail,timestamp,id,title,email,...enquiryForm.value}).then(data=>{
      enquiryForm.reset()
      this.showForm=false
      console.log(email)
    }).catch(err=>{
      console.log(err)
    })
  }

}