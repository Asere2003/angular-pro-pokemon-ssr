import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationRef, ChangeDetectionStrategy, Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { map, tap } from 'rxjs';

import { PokemonList } from "../../pokemons/components/pokemon-list/pokemon-list";
import { PokemonListSkeleton } from "./ui/pokemon-list-skeleton/pokemon-list-skeleton";
import { Pokemons } from '../../pokemons/services/pokemons';
import { SimplePokemon } from '../../pokemons/interface/simple-pokemon';
import { Title } from '@angular/platform-browser';
import { toSignal } from '@angular/core/rxjs-interop'

@Component({
  selector: 'pokemons-page',
  imports: [PokemonList, PokemonListSkeleton],
  templateUrl: './pokemons-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonsPage implements OnInit{

  private title = inject(Title)
  private readonly pokemonsService = inject(Pokemons);
  public pokemons = signal<SimplePokemon[]>([]);
  public route = inject(ActivatedRoute)
  public router = inject(Router)


  public currentPage = toSignal<number>(
    this.route.queryParamMap.pipe(
      map( params => params.get('page') ?? '1'),
      map(page => (isNaN(+page) ? 1 : +page )),
      map(page => Math.max(1, page ))
    )
  );

  // public isloading = signal(true);

  // private appRef = inject(ApplicationRef);

  // private $appRef = this.appRef.isStable.subscribe((isStabled) => {
  //   console.log('Init component and subscribing to appRef');
  //   console.log('Is App Stable? ', isStabled);
  // });

  ngOnInit() {

    this.loadPokemons(0)

    // setTimeout(() => {
    //   this.isloading.set(false);
    // }, 5000);
  }

  // ngOnDestroy() {
  //   console.log('Destroying component and unsubscribing from appRef');
  //   this.$appRef.unsubscribe();
  // }

  public loadPokemons( page : number = 1 ) {

      const pageToLoad = this.currentPage()! + page;

      this.pokemonsService.loadPage(pageToLoad)
        .pipe(
          tap( () => {
            this.router.navigate([], { queryParams : { page : pageToLoad } })
          }),
          tap(() => {
            this.title.setTitle( `pokemons--SSR  ${ pageToLoad }` )
          })
        )
        .subscribe( pokemons => {
          this.pokemons.set(pokemons);
      });
  }


}
