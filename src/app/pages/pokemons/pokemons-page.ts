import { ApplicationRef, ChangeDetectionStrategy, Component, OnDestroy, OnInit, inject, signal } from '@angular/core';

import { PokemonList } from "../../pokemons/components/pokemon-list/pokemon-list";
import { PokemonListSkeleton } from "./ui/pokemon-list-skeleton/pokemon-list-skeleton";
import { Pokemons } from '../../pokemons/services/pokemons';
import { SimplePokemon } from '../../pokemons/interface/simple-pokemon';

@Component({
  selector: 'pokemons-page',
  imports: [PokemonList, PokemonListSkeleton],
  templateUrl: './pokemons-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonsPage implements OnInit{

  private readonly pokemonsService = inject(Pokemons);
  public pokemons = signal<SimplePokemon[]>([]);
  public currentPage = signal(0);

  // public isloading = signal(true);

  // private appRef = inject(ApplicationRef);

  // private $appRef = this.appRef.isStable.subscribe((isStabled) => {
  //   console.log('Init component and subscribing to appRef');
  //   console.log('Is App Stable? ', isStabled);
  // });

  ngOnInit() {

    this.loadPokemons(this.currentPage());

    // setTimeout(() => {
    //   this.isloading.set(false);
    // }, 5000);
  }

  // ngOnDestroy() {
  //   console.log('Destroying component and unsubscribing from appRef');
  //   this.$appRef.unsubscribe();
  // }

  public loadPokemons( page : number ) {
      this.pokemonsService.loadPage(page).subscribe( pokemons => {
        this.pokemons.set(pokemons);
      });
  }

  public loadNextPage() {
    if (this.currentPage() == 0) {
      this.currentPage.set(1);
    }
    const nextPage = this.currentPage() + 1;
    this.currentPage.set(nextPage);
    this.loadPokemons(nextPage);
  }

  public loadPreviousPage() {
    const previousPage = this.currentPage() - 1;
    if (previousPage >= 0) {
      this.currentPage.set(previousPage);
      this.loadPokemons(previousPage);
    }
  }
}
