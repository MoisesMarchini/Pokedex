import { Component, HostListener, OnInit } from '@angular/core';
import { environment } from 'src/app/helpers/environment';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  private previousScrollY = 0;
  scrolledUp = false;

  get searchText() { return environment.searchText }
  set searchText(text) { environment.searchText = text }

  constructor() { }

  ngOnInit() {
  }

  hideSearchBar() { return environment.hideSearchBar }

  @HostListener('document:scroll')
  onScroll() {
    const currentScrollY = window.scrollY;

    this.scrolledUp = currentScrollY < this.previousScrollY && currentScrollY !== 0;

    this.previousScrollY = currentScrollY;
  }

}
