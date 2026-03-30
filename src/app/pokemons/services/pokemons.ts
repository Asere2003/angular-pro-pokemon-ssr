import { Injectable, inject } from '@angular/core';
import { Observable, map, tap } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { PokemonAPIResponse } from '../interface/pokemon-api-reponse';
import { SimplePokemon } from '../interface/simple-pokemon';

@Injectable({
  providedIn: 'root'
})
export class Pokemons {

  private readonly http = inject(HttpClient);

  public loadPage( page: number  ) : Observable<SimplePokemon[]> {

    // La API de Pokémon utiliza un sistema de paginación basado en "offset" y "limit".
    if (page != 0 ) {
      page--;
    }

    /* Asegurarse de que la página no sea negativa */
        page = Math.max(0, page);

    return this.http.get<PokemonAPIResponse>(
      `https://pokeapi.co/api/v2/pokemon?offset=${page * 20}&limit=20`
    ).pipe(
      map( response => {
        const simplePokemon : SimplePokemon[] = response.results.map( (pokemon ) => ({
          name: pokemon.name,
          id: pokemon.url.split('/').at(-2) ?? ''
        }));
        return simplePokemon;
      }),
      tap( response => console.log('Pokemons loaded: ', response))

    );
  }
}
