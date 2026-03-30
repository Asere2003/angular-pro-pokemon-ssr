import { ChangeDetectionStrategy, Component, Input, input } from '@angular/core';

import { PokemonsCard } from "../pokemons-card/pokemons-card";
import { SimplePokemon } from '../../interface/simple-pokemon';

@Component({
  selector: 'pokemon-list',
  imports: [PokemonsCard],
  templateUrl: './pokemon-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonList {

  public pokemons = input.required<SimplePokemon[]>();

}
