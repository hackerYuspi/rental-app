import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  constructor(private db:AngularFirestore) { }

  addRental(rental){
    let createdOn = new Date()
    return this.db.collection('rentals').add({createdOn,...rental})
  }

  getAllRentals(){
    return this.db.collection('rentals').snapshotChanges().pipe(
      map(actions => actions.map(a=>{
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    )
  }

  updateRental(rental,id){
    // console.log(rental)
    var docRef = this.db.collection("rentals").doc(id);

    let updatedOn = new Date()
    return docRef.update({
        createdOn:updatedOn,
        description:rental.description,
        // image:rental.image,
        locality:rental.locality,
        price:rental.price,
        title:rental.title,
      })
      .then(function() {
          console.log("Document successfully updated!");
      })
      .catch(function(error) {
          console.error("Error updating document: ", error);
      });
  }

  getOrderedRentals(by){
    return  this.db.collection('rentals',ref=>ref.orderBy('price',by)).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  getByLocality(searchkey){
   return this.db.collection('rentals',ref=>ref.where('locality','==',searchkey)).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  getMyRentals(owner){
    return this.db.collection('rentals',ref=>ref.where('ownerEmail','==',owner)).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    ); 
  }


  update(property){
    this.db.collection('rentals').doc(property.id).update(property)
  }

  delete(id){
    this.db.collection('rentals').doc(id).delete()
  }
}

