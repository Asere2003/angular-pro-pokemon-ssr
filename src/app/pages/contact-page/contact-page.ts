import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SeoPage } from '../../services/seo-page';

@Component({
  selector: 'app-contact-page',
  imports: [],
  templateUrl: './contact-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ContactPage {

  private seoPage = inject( SeoPage );

  ngOnInit(): void {
    this.seoPage.setTitle('Contact Page');
    this.seoPage.setMetaDescription('This is the contact page');
  }

}
