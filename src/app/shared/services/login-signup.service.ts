import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '../../core/service/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginSignupService {

  public login_url = " http://localhost:8080";
  public reg_url = " http://localhost:8080";
  public addMerchant="http://localhost:8080/merchant/add" ;


  public addUser="http://localhost:8080/user/add"

  constructor(private http:HttpClient, private apiService:ApiService) { }
  authLogin(user_name:any, password:any):Observable<any>{
    return this.apiService.post(this.login_url+'/user/login',{email: user_name, password: password});
  }

  userRegister(user_dto:any):Observable<any>{
    return this.apiService.post(this.reg_url+'/user',user_dto)
  }

  merchantRegister(user_dto:any):Observable<any>{
    return this.apiService.post(this.addMerchant,user_dto)
  }

  normalUserRegister(user_dto:any):Observable<any>{
    return this.apiService.post(this.addUser,user_dto)
  }

  adminLogin(user_name:any, password:any):Observable<any>{
    return this.apiService.get(this.login_url+'/user?email='+user_name+'&password='+password+'&role=admin');
  }
}
