import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import { SimplePokemon } from '../../interface/simple-pokemon';

@Component({
  selector: 'pokemons-card',
  imports: [],
  templateUrl: './pokemons-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonsCard {

  public pokemon = input.required<SimplePokemon>();

  public readonly getPokemonImageUrl = computed(
    () =>
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${this.pokemon().id}.png`);

}
