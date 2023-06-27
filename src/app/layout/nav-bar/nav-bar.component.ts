import { Component, HostListener, OnInit } from '@angular/core';
import { environment } from 'src/app/helpers/environment';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  scrolled = false;

  constructor() { }

  ngOnInit() {
  }

  get searchText() { return environment.searchText }
  set searchText(text) { environment.searchText = text }

  @HostListener('document:scroll')
  onScroll() {
    this.scrolled = window.scrollY > 0;
  }

}
