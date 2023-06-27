import { Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from 'src/app/helpers/environment';
import { NameUrl } from 'src/app/models/NameUrl';
import { PokedexService } from 'src/app/services/pokedex.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy{
  @ViewChildren('lastPkm', { read: ElementRef }) lastPkmList: QueryList<ElementRef> | undefined;

  searchRoute?: 'type' | 'move';
  searchParam?: string;
  subscription?: Subscription;

  take = 20;
  currentPage = 0;

  headerText() {
    let result = 'Exibindo Pokémons '
    if (!this.searchParam)
      return result;

    let capitalizedStr = this.searchParam.charAt(0).toUpperCase() + this.searchParam.slice(1).toLowerCase();
    switch (this.searchRoute) {
      case 'type':
        result += `do tipo '${capitalizedStr}'`
        break;
      case 'move':
        result += `que aprendem '${capitalizedStr}'`
        break;
      default:
        break;
    }
    if (environment.searchText !== '')
      result += ` e que possuam '${environment.searchText}' no nome ou no id`

    return result;
  }

  private _pokemonList: NameUrl[] = [];
  get pokemonList() {
    const endAt = (this.currentPage * this.take) + this.take;
    return this._pokemonList
      .filter((pkm, index) =>
        pkm.name.toLowerCase().includes(environment.searchText.toLowerCase()) ||
        (index + 1).toString() == (environment.searchText))
      .slice(0, endAt);
  }

  constructor(
    private pokedexService: PokedexService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.intersectionObserver();
    this.subscription =
      this.activatedRoute.params.subscribe(
        (params: any) => {
          if (params['type']){
            this.searchParam = params['type'];
            this.searchRoute = 'type'
          }

          if (params['move']){
            this.searchParam = params['move'];
            this.searchRoute = 'move'
          }

          if (this.searchParam)
            this.loadList();
          else
            this.router.navigateByUrl('/');
        }
      )
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  loadList() {
    const APICALL =
      this.searchRoute === 'type' ? this.pokedexService.getPokemonListByType(this.searchParam!) :
      this.searchRoute === 'move' ? this.pokedexService.getPokemonListByMove(this.searchParam!) : null;

    if (APICALL === null)
      return;

    APICALL.subscribe({
      next: (value) => {
        this._pokemonList = value;
        this.subscribeLastPkm();
      }
    })
  }

  // LAZY-LOAD FEATURES

  observer: any;

  intersectionObserver() {
    let options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.25,
    };

    this.observer = new IntersectionObserver((entries) => {

      if (entries[0].isIntersecting) {
        this.currentPage += this.pokemonList.length < this._pokemonList.length? 1 : 0;
      }

    }, options);
  }

  subscribeLastPkm() {
    this.lastPkmList?.changes?.subscribe((d) => {
      if (d.last)
        this.observer.observe(d.last.nativeElement);
    })
  }
}
