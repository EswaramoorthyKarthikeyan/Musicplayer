import { Component, OnInit,HostListener } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @HostListener('window:scroll', ['$event']) 
  scrollHandler(event) {
    this.isScrollTop  = (event.path[1].scrollY > 80);
  }
  constructor() { }

  isScrollTop:boolean = false;
  ngOnInit(): void {
  }

}
