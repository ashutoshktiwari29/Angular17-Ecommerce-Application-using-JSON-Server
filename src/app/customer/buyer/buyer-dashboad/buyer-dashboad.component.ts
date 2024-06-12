import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-buyer-dashboad',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule,CommonModule, RouterLink],
  templateUrl: './buyer-dashboad.component.html',
  styleUrl: './buyer-dashboad.component.css'
})
export class BuyerDashboadComponent implements OnInit{
  all_ticket:any;
  show_Checkout:boolean =false;
  adduser:any=false
  constructor(private formBuilder:FormBuilder, private router:Router, private customerService:CustomerService){
  }

  ticketfrom!:FormGroup;

  merchantOptions = [
    {displayName: "Jio", value: "1"},
    {displayName: "Airtel", value: "3"},
  ]

  statusOptions = [
    {displayName: "NEW", value: "NEW"},
    // {displayName: "IN-PROGRESS", value: "IN_PROGRESS"},
    // {displayName: "RESOLVED", value: "RESOLVED"},
  ]

  ngOnInit(): void {
   this.getAllProduct()
   this.ticketfrom = this.formBuilder.group({
    merchantId: [''],
    description: [''],
    title: [''],
    status:[''],
  });

    if(sessionStorage.getItem('role')?.toUpperCase() == 'merchant'.toUpperCase()){
      this.statusOptions = [
        {displayName: "NEW", value: "NEW"},
        {displayName: "IN-PROGRESS", value: "IN_PROGRESS"},
        {displayName: "RESOLVED", value: "RESOLVED"},
      ]
    }
  }
  getAllProduct(){
    this.customerService.getTicketsListForUser().subscribe(data=>{
      this.all_ticket = data;
    },error=>{
      console.log("My error", error)
    })
  }

  addUser(){
   this.adduser=true;
   this.onEdit = false
  }


  addTicket(){
   let obj: any={
    "merchantId":this.ticketfrom.value.merchantId,
    "description":this.ticketfrom.value.description,
    "title":this.ticketfrom.value.title,
    "status":this.ticketfrom.value.status,
    "createrUserId": this.onEdit? this.ticketfrom.value.createrUserId : sessionStorage.getItem('user_session_id')
     }

     if(this.onEdit){
      obj['ticketId'] = this.ticketfrom.value.ticketId 
      // if(sessionStorage.getItem('role')?.toUpperCase() == 'user'.toUpperCase())delete obj['status'] 
      this.customerService.updateTicketRequest(obj).subscribe(data => {
        this.getAllProduct()
        this.adduser = false

      }, error => {
        console.log('error', error)
      })
     }
     else{
      this.customerService.normalUserRegister(obj).subscribe(data=>{
        this.getAllProduct()
  
        this.adduser = false
      },error=>{
        console.log("My error", error)
        
      })
     }
  }
  onEdit = false
  editTicket(data:any){
   this.adduser=true;
    this.onEdit=true;
    this.ticketfrom = this.formBuilder.group({
      ticketId: [data.ticketId],
      merchantId: [data.merchantId],
      description: [data.description],
      title: [data.title],
      status:[data.status],
      createrUserId: [data.createrUserId]
    });
  }

  buyProduct(id:number){
    this.show_Checkout = true;
    this.customerService.quickBuyProduct(id);
    this.router.navigateByUrl('/checkout');
  }
  addToCart(){
    alert("This is showcase")
  }
}
