import { Component, OnInit } from '@angular/core';
import { EmployeeDataService } from '../services/employee-data.service';
import { Router } from '@angular/router';
import Resp from '../../interfaces/response'
import { SessionService } from '../services/session.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  username: string;
  signup: boolean;
  alert_type: string;
  alert_message: string;
  loggedUser: boolean;
  constructor(private dataService: EmployeeDataService, private router: Router, private sessionService: SessionService) {
    this.signup = false;
    this.loggedUser = false;
  }

  ngOnInit() {
  }
  formSubmit(username, password, secret): void {
    this.alert_type = undefined;
    this.signup ? this.signUp(username, password, secret) : this.login(username, password);
  }
  signUpForm(): void {
    this.alert_type = undefined;
    this.signup = true;
  }
  cancel(): void {
    this.signup = false;
    this.alert_type = undefined;
  }
  signUp(username, password, secret): void {
    if(!username || !password || !secret){
      this.alert_type = "error";
      this.alert_message = "Username or Password cannot be left blank."
    } else {
      this.dataService.addEmployee(username, password, secret).subscribe((resp: Resp) => {
        this.alert_message = resp.message;
        if (resp.key) {
          this.alert_type = 'success';
          this.signup = false;
        } else {
          this.alert_type = 'error';
        }
      })
    }
  }
  login(username, password): void {
    this.dataService.authorizeEmployee(username, password).subscribe((resp: Resp) => {
      if(resp.key){
        this.loggedUser = true;
        this.username = username;
      } else{
        this.alert_type = 'error';
        this.alert_message = resp.message;
      }
    })
  }
  cashSubmit(cashBalance): void{
    if(!cashBalance || cashBalance<=0){
      this.alert_type = 'error';
      this.alert_message = "Invalid value of Cash Balance"
    } else {
      this.dataService.updateEmployeeCash(this.username, cashBalance).subscribe((resp: Resp)=>{
        this.sessionService.setSessionAttribute("Emp", this.username);
        console.log(resp.message);
        this.router.navigate(['employee']);
      })
      
    }
  }
}
