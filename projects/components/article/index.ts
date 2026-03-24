import { NgModule } from '@angular/core';
import { WeUIArticleComponent } from './src/article.component';

export { WeUIArticleComponent };

@NgModule({
  imports: [WeUIArticleComponent],
  exports: [WeUIArticleComponent],
})
export class WeUIArticleModule {}
