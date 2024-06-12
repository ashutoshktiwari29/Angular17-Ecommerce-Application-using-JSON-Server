import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-seller-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './seller-dashboard.component.html',
  styleUrl: './seller-dashboard.component.css'
})
export class SellerDashboardComponent implements OnInit{
  order_dashboard_data:any;
  total_order:any;
  last_order_date:any;
  product_dashboard_data:any;
  total_product:number =0;
  publish_product:number =0;
  inactive_product:number =0;
  draft_product:number =0;

  constructor(private formBuilder:FormBuilder, private router:Router, private customerService:CustomerService){

  }

  ticketfrom!:FormGroup;

  ngOnInit(): void {
    this.sellerOrderDashboardData();
    this.sellerProductDashboardData();
    
    this.ticketfrom = this.formBuilder.group({
      id: [''],
      description: [''],
      title: [''],
      status:['']
    });

  }
  sellerProductDashboard(){
    this.router.navigateByUrl("/seller/product")
  }


  onEdit=false;
  editTicket(data:any){
    this.onEdit=true;
    this.ticketfrom = this.formBuilder.group({
      id: [data.id],
      description: [data.description],
      title: [data.title],
      status:[data.status]
    });
  }


  submitForm(){

    this.customerService.getTicketsList().subscribe(data=>{
      this.order_dashboard_data = data;
      console.log("Order Dashboard data",this.order_dashboard_data);
      // this.total_order = Number(this.order_dashboard_data.length);
      // this.last_order_date = this.order_dashboard_data[this.total_order -1].dateTime;
    }, error=>{
      console.log("My error data", error);
    })


  }

  sellerOrderDashboard(){
    alert("this option for only WIP candidates")
  }
  sellerOrderDashboardData(){
    this.customerService.getTicketsList().subscribe(data=>{
      this.order_dashboard_data = data;
      console.log("Order Dashboard data",this.order_dashboard_data);
      // this.total_order = Number(this.order_dashboard_data.length);
      // this.last_order_date = this.order_dashboard_data[this.total_order -1].dateTime;
    }, error=>{
      console.log("My error data", error);
    })
  }
  sellerProductDashboardData(){
    this.customerService.productDashboardData().subscribe(data =>{
      this.product_dashboard_data = data;
      for(status in this.product_dashboard_data){
        console.log(this.product_dashboard_data[status].status);
        if(this.product_dashboard_data[status].status =='publish'){
          ++this.publish_product;
        }else if(this.product_dashboard_data[status].status =='inactive'){
          ++this.inactive_product;
        }else if(this.product_dashboard_data[status].status =='draft'){
          ++this.draft_product;
        }
        ++this.total_product;
      }
    },error =>{
      console.log("My error",error)
    })
  }
}
