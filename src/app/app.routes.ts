import { Routes } from '@angular/router';

export const routes: Routes = [

{
  path: 'pokemons',
  loadComponent: () => import('./pages/pokemons/pokemons-page').then(m => m.PokemonsPage)
},

{
  path: 'about',
  loadComponent: () => import('./pages/about-page/about-page').then(m => m.AboutPage)
},
{
  path: 'pricing',
  loadComponent: () => import('./pages/pricing-page/pricing-page').then(m => m.PricingPage)
},
{
  path: 'contact',
  loadComponent: () => import('./pages/contact-page/contact-page').then(m => m.ContactPage)
},
{
  path: '**',
  redirectTo: () => {
    return 'about';
  }
}
];
