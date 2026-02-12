import { ChangeDetectionStrategy, Component, inject, PLATFORM_ID } from '@angular/core';
import { SeoPage } from '../../services/seo-page';
import { isPlatformServer } from '@angular/common';

@Component({
  selector: 'app-pricing-page',
  imports: [],
  templateUrl: './pricing-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PricingPage {

  private seoPage = inject( SeoPage );


  ngOnInit(): void {
    this.seoPage.setTitle('Pricing Page');
    this.seoPage.setMetaDescription('This is the pricing page');
  }
}
