import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CustomerDataService } from '../services/customer-data.service';
import swal from 'sweetalert2';
import Resp from '../../interfaces/response'
@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {
  @Output() result = new EventEmitter<boolean>();
  alert_type: string;
  alert_message: string;
  constructor(private dataService: CustomerDataService) { }

  ngOnInit() {
  }

  cancel(): void {
    this.result.emit(false);
  }
  customerFormSubmit(name, email, mobile, address): void {
    if (!name || !email || !mobile) {
      this.alert_type = "error";
      this.alert_message = "Customer Name, email or mobile cannot be left blank."
    } else {
      this.dataService.addCustomer(name, email, mobile, address).subscribe((resp: Resp) => {
        this.alert_message = resp.message;
        if (resp.key) {
          this.alert_type = 'success';
          swal({
            type: 'success',
            text: this.alert_message,
            background: '#2b2e31',
            confirmButtonColor: '#879948'
          })
          this.result.emit(false);
        } else {
          this.alert_type = 'error';
        }
      })
    }
  }
}
