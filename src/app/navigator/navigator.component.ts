import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { EmployeeDataService } from '../services/employee-data.service';
import Resp from '../../interfaces/response';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.css']
})
export class NavigatorComponent implements OnInit {
  @Input() username;
  constructor(private employeeDataService: EmployeeDataService,
    private sessionService: SessionService,
    private router: Router) { }

  ngOnInit() {
  }
  logout(): void{
    this.employeeDataService.getEmployeeCash(this.username).subscribe((resp: Resp)=>{
      swal({
        title: 'Confirm ?',
        text: "The Closing Cash Drawer Balance is: $ "+resp.message,
        showCancelButton: true,
        background: '#2b2e31',
        confirmButtonColor: '#879948',
        cancelButtonColor: '#A55045',
        confirmButtonText: 'Ok'
      }).then((result) => {
        if (result.value) {
          this.sessionService.clearSession();
          this.router.navigate(['']);
        }
      })
    })
  }
}

