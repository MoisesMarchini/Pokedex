import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/app/helpers/environment';
import { MovesetModel } from 'src/app/models/moveset';
import { PokedexService } from 'src/app/services/pokedex.service';

@Component({
  selector: 'app-moveset-row',
  templateUrl: './moveset-row.component.html',
  styleUrls: ['./moveset-row.component.css']
})
export class MovesetRowComponent implements OnInit {
  @Input() moveset?: MovesetModel;
  @Input() movesetUrl?: string;
  @Input() level?: number;

  loaded = false;
  damageClassesStrings = ['physical', 'status', 'special'];
  damageClassesImgs = [
    '/assets/images/damage-class-physical.png',
    '/assets/images/damage-class-status.png',
    '/assets/images/damage-class-special.png'
  ];
  damageClassImg?: string;

  @HostBinding('class')
  get hostClasses(): string {
    return this.loaded ? 'loaded' : '';
  }

  constructor(
    private pokedexService: PokedexService,
    private router: Router,
  ) { }

  ngOnInit() {
    if (this.moveset){
      this.loaded = true;
      this.getDamageClassImg();
      return;
    }

    if (!this.moveset && this.movesetUrl) {

      const urlSplit = this.movesetUrl.split('/');
      const urlId = parseInt(urlSplit[urlSplit.length - 2])
      const fetchedPkm = environment.movesetModelList.find(p => p.id === urlId);

      if (fetchedPkm) {
        this.moveset = fetchedPkm;
        this.getDamageClassImg();
        this.loaded = true;
        return;
      }

      this.pokedexService.getMovesetByUrl(this.movesetUrl).subscribe({
        next: (pkm) => {
          this.moveset = pkm;
          this.getDamageClassImg();
          this.loaded = true;
        }
      })
    }
  }

  onClick() {
    this.router.navigateByUrl('search/move/' + this.moveset?.name);
  }

  getDamageClassImg(){
    if (!this.moveset)
      return;

    const damageClassIndex = this.damageClassesStrings.findIndex(p => p === this.moveset!.damage_class.name.toLowerCase());
    this.damageClassImg = this.damageClassesImgs[damageClassIndex];
  }

}
