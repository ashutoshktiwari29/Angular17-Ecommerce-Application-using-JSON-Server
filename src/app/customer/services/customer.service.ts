import { Injectable } from '@angular/core';
import { ApiService } from '../../core/service/api.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private single_poduct_id = new BehaviorSubject(null);
  currentProduct = this.single_poduct_id.asObservable();

  public user_url="http://localhost:8080/user/";
  public product_url="http://localhost:8080/products/";
  public order_url="http://localhost:8080/orders/";
  public getTickets= "http://localhost:8080/ticket/getTicketPage";
  public addTicket="http://localhost:8080/ticket/add"
  public updateTicket="http://localhost:8080/ticket/update"
 
  constructor(private apiService:ApiService) { }

  allProduct():Observable<any>{
    return this.apiService.get(this.product_url);
  }

  normalUserRegister(user_dto:any):Observable<any>{
    return this.apiService.post(this.addTicket,user_dto)
  }

  updateTicketRequest(req: any): Observable<any>{
    return this.apiService.put(this.updateTicket, req)
  }


  getTicketsList(){
    return this.apiService.get(this.getTickets);
  }


  getTicketsListForUser(){
    let id;
    if(sessionStorage.getItem('role')?.toUpperCase() == 'merchant'.toUpperCase()) {
      id = '?merchantId=' + sessionStorage.getItem('merchant_id')
    }else if(sessionStorage.getItem('role')?.toUpperCase() == 'user'.toUpperCase()){
      id = '?userId=' + sessionStorage.getItem('user_session_id')
    }
    return this.apiService.get(this.getTickets+ id);
  }

  quickBuyProduct(product_id:any){
    this.single_poduct_id.next(product_id)
  }
  individualProduct(id:any){
    return this.apiService.get(this.product_url+id);
  }
  userDetail(id:any){
    return this.apiService.get(this.user_url+id);
  }
  insertNewOrder(order_dto:any):Observable<any>{
    return this.apiService.post(this.order_url, order_dto);
  }

  orderDashboardData():Observable<any>{
    return this.apiService.get(this.order_url);
  }

  productDashboardData():Observable<any>{
    return this.apiService.get(this.product_url);
  }
}
