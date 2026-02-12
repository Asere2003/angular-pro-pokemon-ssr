import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { SeoPage } from '../../services/seo-page';

@Component({
  selector: 'app-about-page',
  imports: [],
  templateUrl: './about-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutPage implements OnInit {

  private seoPage = inject( SeoPage );

  ngOnInit(): void {
    this.seoPage.setTitle('About Page');
    this.seoPage.setMetaDescription('This is the about page');
  }

}
