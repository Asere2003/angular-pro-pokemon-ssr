import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';


@Injectable({
  providedIn: 'root'
})
export class SeoPage {

  private title = inject( Title );
  private meta = inject( Meta );
  public platformId = inject( PLATFORM_ID);

  setTitle( title: string ) {
    this.title.setTitle( title );
  }

  setMetaDescription( description: string ) {
    this.meta.updateTag({ name: 'description', content: description });
  }

}
