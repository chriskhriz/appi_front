import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Article } from './article';
import { ProductosInterface } from './interfaces/productos-interface';


export class ShoppingCart {

  // items: Map<Article, number>;
  items: Map<ProductosInterface, number>;

  constructor() {
    // this.items = new Map<Article, number>();
    this.items = new Map<ProductosInterface, number>();
  }


  addArticle(article: any) {

    if (this.items.has(article[0])) {
      this.items.set(article[0], this.items.get(article[0]) + 1);
    } else {
      this.items.set(article[0], 1);
    }

    // if (this.items.has(article)) {
    //   this.items.set(article, this.items.get(article) + 1);
    // } else {
    //   this.items.set(article, 1);
    // }
  }

  get isEmpty(): boolean {
    return this.items.size === 0;
  }

  // get totalPrice(): number {
  //   let total = 0;
  //   for (const entry of this.items.entries()) {
  //     total += entry[0].precio_ven * entry[1];
  //   }
  //   return total;
  // }
}
