import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RentalService } from 'src/app/service/rental.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addrental',
  templateUrl: './addrental.component.html',
  styleUrls: ['./addrental.component.css']
})
export class AddrentalComponent implements OnInit {
  isPropertyAdded:boolean=false

  constructor(public rentalService:RentalService,public router:Router) { }

  ngOnInit() {
  }

  addProperty(addRentalform:NgForm){
    console.log(addRentalform.value)
    this.rentalService.addRental(addRentalform.value).then(data=>{
      console.log(data.id)
      addRentalform.reset()
      this.isPropertyAdded=true
    }).catch(err=>{
      console.log(err)
    })
  }

}
