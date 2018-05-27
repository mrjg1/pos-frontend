import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import Drawer from '../../interfaces/drawer';
import { DrawerDataService } from '../services/drawer-data.service';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.css']
})
export class DrawerComponent implements OnInit {
  username: string;
  startingDrawer: Drawer[];
  closingDrawer: Drawer[];
  drawer: Drawer[];
  constructor(private drawerDataService: DrawerDataService,
    private sessionService: SessionService,
    private router: Router) { 
      this.username = this.sessionService.getSessionAttribute("Emp");
    }

  ngOnInit() {
    if (!this.username) {
      this.router.navigate(['']);
    }
    this.drawerDataService.getDrawer(this.username).subscribe((drawer: Drawer[])=>{
      this.startingDrawer = drawer.splice(drawer.findIndex(d => d.orderNumber==0), 1);
      this.closingDrawer = drawer.splice(drawer.findIndex(d => d.orderNumber==1), 1);
      this.drawer= drawer;
    })
  }

}
