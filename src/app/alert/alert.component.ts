import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  alert_class: string;
  span_class: string;
  @Input() alertType:string;
  @Input() alertMessage:string;
  constructor() {
  }

  ngOnInit() {
    if(this.alertType==='success'){
      this.alert_class='alert alert-success fade in';
      this.span_class='fontawesome-ok'
    }
    if(this.alertType==='error'){
      this.alert_class='alert alert-error fade in';
      this.span_class='fontawesome-warning-sign';
    }
  }

}
