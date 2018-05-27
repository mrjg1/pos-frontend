import { Component, OnInit } from '@angular/core';
import { EmployeeDataService } from '../services/employee-data.service';
import { InstantiateExpr } from '@angular/compiler';

@Component({
  selector: 'app-sales-report',
  templateUrl: './sales-report.component.html',
  styleUrls: ['./sales-report.component.css']
})
export class SalesReportComponent implements OnInit {
  alert_type: string;
  alert_message: string;
  constructor(private employeeDataService: EmployeeDataService) {  }

  ngOnInit() {
  }
  formSubmit(from, to): void{
    this.alert_type = undefined;
    if(!from || !to){
      this.alert_type = "error";
      this.alert_message = "Dates cannot be left blank";
    } else {
      this.employeeDataService.getSalesReport(this.changeDateFormat(from), this.changeDateFormat(to)).subscribe(data => {
        this.downloadFile(data)
      })
    }    
  }
  changeDateFormat(date: string): string{
    return  date.split('-').reverse().join('-');  
  }
  // This function creates a downlod link for the received 
  // Blob file and also clicks it programatically for instant
  // download.
  downloadFile(data: Blob): void{
    var blob = new Blob([data], { type: 'text/csv' });
    var url= window.URL.createObjectURL(blob);
    var downloadLink = document.createElement("a");
    downloadLink.href = url;
    downloadLink.download = "Sales_Report.csv";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }
}
