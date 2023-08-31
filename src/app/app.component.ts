import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from './misc/header/header.component';
import { VehicleSearchComponent } from './vehicle/vehicle-search/vehicle-search.component';
import { FooterComponent } from './misc/footer/footer.component';
import { FormControl, FormGroup } from '@angular/forms';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { VehicleListComponent } from './vehicle/vehicle-list/vehicle-list.component';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'reservation';
}

//       form:FormGroup;
//       reservations:any[]=[];
//       constructor(private httpClient:HttpClient){
//         this.form=new FormGroup({
//          start_date :new FormControl(''),
//          end_date: new FormControl('')
//         });
//       }
//       ngOnInit() {
//           this.fetchReservations();
//       }
    
//     sendData(){
//       const data= this.form.value;

//       this.httpClient.post('http://localhost:8080/reservations',data,{responseType:'text'})
//       .subscribe(
//         result => {
//           if(result==="Reservation saved succesfully"){
//             console.log('Reservation created successfully.')
//             this.form.reset();
//             this.fetchReservations();
//           }else{
//             console.log('Reservation created:', result);
//             this.form.reset();
//             this.fetchReservations();
//           }
//         }
//         (error:HttpErrorResponse) => {
//           console.error('Error creating reservation:'error);
//         }
//       )
// ;
//   deleteReservation(id:number){
//     this.httpClient.delete('http://localhost:8080/reservations/delete/${id}`,{responseType:'text'})
//     .subscribe(
//       result=>{
//         console.log('Reservation deleted:',result);
//         if(result==="Deletion successful"){
//           this.fetchReservations();
//         }
//       };
//       error=>{
//         console.error('Error deleting Reservation:',error);
//       }

//     );
//   }
//   fetchReservations() {
//     this.httpClient.get<any[]>('http://localhost:8080/reservations')
//     .subscribe(
//       data=>{
//         this.reservations=data;
//       },
//       error=>{
//         console.error('Error fetching fleets:',error);
//       }
//     )
//   }
//   }
// }