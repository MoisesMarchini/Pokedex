import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { PokedexService } from '../../services/pokedex.service';
import { environment } from 'src/app/helpers/environment';
import { PokemonList } from 'src/app/models/pokemonList';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChildren('lastPkm', { read: ElementRef }) lastPkmList: QueryList<ElementRef> | undefined;

  take = 20;
  currentPage = 0;

  observer: any;
  private _lazyList: PokemonList[] = [];
  get lazyList() {
    if (environment.searchText === '')
      return this._lazyList;

    const filteredList =
      environment.pokemonList
        .filter((pkm, index) => pkm.name.toLowerCase().includes(environment.searchText.toLowerCase()) || (index + 1).toString() == (environment.searchText));
    return filteredList;
  }

  constructor(
    private pokedexService: PokedexService
  ) { }

  ngOnInit() {
    this.intersectionObserver();
    if(environment.pokemonList.length === 0)
      this.pokedexService.getMany().subscribe({
        next: (value) => {
          environment.pokemonList = value;
          this.loadMore(false);
          this.subscribeLastPkm();
        }
      })
    else{
      this.loadMore(false);
      this.subscribeLastPkm();
    }
  }

  subscribeLastPkm() {
    this.lastPkmList?.changes?.subscribe((d) => {
      if (d.last)
        this.observer.observe(d.last.nativeElement);
    })
  }

  isSearchTextEmpty() {
    return environment.searchText === '';
  }

  intersectionObserver() {
    let options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.25,
    };

    this.observer = new IntersectionObserver((entries) => {

      if (entries[0].isIntersecting) {
        this.loadMore();
      }

    }, options);
  }

  loadMore(increase: boolean = true) {
    if (!this.isSearchTextEmpty())
      return;
    if (increase)
      this.currentPage++;
    const beginAt = this.currentPage * this.take;
    const endAt = beginAt + this.take;
    this._lazyList = this._lazyList.concat(environment.pokemonList.slice(beginAt, endAt));
  }
}
