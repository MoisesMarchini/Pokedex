import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { environment } from 'src/app/helpers/environment';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit, OnInit {
  @ViewChildren('lastPkm', { read: ElementRef }) lastPkmList: QueryList<ElementRef> | undefined;

  subscription?: Subscription;

  take = 20;
  currentPage = 0;

  observer: any;

  get lazyList() {
    const endAt = (this.currentPage * this.take) + this.take;
    return environment.pokemonList
      .filter((pkm, index) =>
        pkm.name.toLowerCase().includes(environment.searchText.toLowerCase()) ||
        (index + 1).toString() == (environment.searchText)
      )
      .slice(0, endAt);
  }

  headerText() {
    const searchParam = environment.searchText;
    if (!searchParam)
      return '';

    let result = 'Exibindo Pokémons '
    let capitalizedStr = searchParam.charAt(0).toUpperCase() + searchParam.slice(1).toLowerCase();
    result += ` e que possuam '${capitalizedStr}' no nome ou no id`

    return result;
  }

  constructor() { }

  ngOnInit() {
    this.intersectionObserver();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.currentPage++;
      this.subscribeLastPkm();
    }, 200);
  }

  ngOnDestroy() {
  }

  intersectionObserver() {
    let options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.25,
    };

    this.observer = new IntersectionObserver((entries) => {

      if (entries[0].isIntersecting) {
        this.currentPage += this.lazyList.length < environment.pokemonList.length? 1 : 0;
      }

    }, options);
  }

  subscribeLastPkm() {
    this.subscription = this.lastPkmList?.changes.subscribe((d) => {
      if (d.last)
        this.observer.observe(d.last.nativeElement);
    })
  }
}
