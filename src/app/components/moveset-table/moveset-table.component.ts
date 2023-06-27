import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/app/helpers/environment';
import { MovesetModel } from 'src/app/models/moveset';
import { PokedexService } from 'src/app/services/pokedex.service';

@Component({
  selector: 'app-moveset-table',
  templateUrl: './moveset-table.component.html',
  styleUrls: ['./moveset-table.component.scss']
})
export class MovesetComponent implements OnInit {
  @Input() moveset?: MovesetModel;
  @Input() movesetUrl?: string;
  @Input() level?: number;

  loaded = false;

  constructor(
    private pokedexService: PokedexService,
    private router: Router
  ) { }

  ngOnInit() {
    if (this.moveset){
      this.loaded = true;
      return;
    }

    if (!this.moveset && this.movesetUrl) {

      const urlSplit = this.movesetUrl.split('/');
      const urlId = parseInt(urlSplit[urlSplit.length - 2])
      const fetchedPkm = environment.movesetModelList.find(p => p.id === urlId);

      if (fetchedPkm) {
        this.moveset = fetchedPkm;
        this.loaded = true;
        return;
      }

      this.pokedexService.getMovesetByUrl(this.movesetUrl).subscribe({
        next: (pkm) => {
          this.moveset = pkm;
          this.loaded = true;
        }
      })
    }
  }

  onClick() {
    this.router.navigateByUrl('search/move/' + this.moveset?.name);
  }
}
