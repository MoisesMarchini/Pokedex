import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private router: Router) { }

  ngOnInit() {
  }

  hideSearchBar() { return environment.hideSearchBar }
  hideNavBar() { return this.router.url.includes('pokemon') }

  @HostListener('document:scroll')
  onScroll() {
    const currentScrollY = window.scrollY;

    this.scrolledUp = currentScrollY < this.previousScrollY && currentScrollY !== 0;

    this.previousScrollY = currentScrollY;
  }

}
