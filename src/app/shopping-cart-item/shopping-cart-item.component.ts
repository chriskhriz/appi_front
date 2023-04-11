import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Article } from '../article';
import { ProductosInterface } from '../interfaces/productos-interface';

@Component({
  selector: 'app-shopping-cart-item',
  templateUrl: './shopping-cart-item.component.html',
  styleUrls: ['./shopping-cart-item.component.scss']
})
export class ShoppingCartItemComponent implements OnInit {

  contacto: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder) {
  }

  @Input()
  // article: Article;
  article: ProductosInterface;
  Crear: boolean = false;
  Editar: boolean = false;
  ButtonText: string;

  @Input()
  count: number;

  ngOnInit() {

    this.contacto = this.formBuilder.group({
      descripcion: ['', Validators.required],
      cantidad: ['', [Validators.required]],
      item: ['', Validators.required],
      precio_venta: ['', Validators.required],
  });


  if(this.article){

    this.Editar = true;
    this.Crear = false;
    this.ButtonText = 'Actualizar';
    this.contacto.patchValue({
      descripcion: this.article.descripcion,
      cantidad: this.article.cantidad,
      item: this.article.cod_item,
      precio_venta: this.article.precio_ven,

    });
  }else{
    this.ButtonText = 'Crear';
    this.Crear = true;
    this.Editar = false;
  }
  }

  get f() { return this.contacto.controls; }


  onSubmit() {
    this.submitted = true;
    if (this.contacto.invalid) {
        return;
    }
    alert('Mensaje Enviado !')
}



}
