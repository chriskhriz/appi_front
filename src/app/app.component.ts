import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BeepService } from './beep.service';
import { ProductosService } from './productos.service';
import { ProductosInterface } from './interfaces/productos-interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
// export class EvaluacionesComponent implements OnInit  AfterViewInit {

export class AppComponent implements AfterViewInit {

  errorMessage: string;
  catalogue: ProductosInterface[] = [];
  Crear: boolean;
  Editar: boolean;
  ButtonText: string;


  private lastScannedCode: string;
  private lastScannedCodeDate: number;
  productList: any;
  read: boolean = false;

  contacto: FormGroup;
  submitted = false;
  actualCode: any;
  durationInSeconds = 5;


  @ViewChild("focusTrg") trgFocusEl: ElementRef;


  constructor(private changeDetectorRef: ChangeDetectorRef,
    private beepService: BeepService,
    private _productos: ProductosService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar) {

  }

  ngAfterViewInit(): void {

  }


  ngOnInit(): void {

    this.SelectOperation(null);

  }

  async getAllProduct() {
    const result = await this._productos.getAll().toPromise();
    this.catalogue = result;
  }



  addArticle(article, code: any) {

    if (article) {

      this.contacto = this.formBuilder.group({
        descripcion: ['', Validators.required],
        cantidad: ['', [Validators.required]],
        precio_venta: ['', Validators.required],
      });

      this.Editar = true;
      this.Crear = false;

      this.ButtonText = 'Actualizar';

      this.contacto.patchValue({

        descripcion: article.descripcion,
        cantidad: article.cantidad,
        precio_venta: article.precio_ven,

      });

    } else {

      this.contacto = this.formBuilder.group({

        codigo: ['', Validators.required],
        descripcion: ['', Validators.required],
        cantidad: ['', [Validators.required]],
        precio_venta: ['', Validators.required],

      });

      this.contacto.patchValue({
        codigo: code
      });

      this.ButtonText = 'Crear';
      this.Crear = true;
      this.Editar = false;
      return;

    }
  }

  get f() { return this.contacto.controls; }


  onSubmit() {
    this.submitted = true;

    if (this.contacto.invalid) {
      return;
    }

    const record = {};
    record['descripcion'] = this.contacto.get('descripcion').value;
    record['cantidad'] = this.contacto.get('cantidad').value;
    record['precio_ven'] = this.contacto.get('precio_venta').value;

    this._productos.update(this.actualCode, record).subscribe(resp => {
      if (resp) {
        this.beepService.beep();
        setTimeout(() => {
          window.location.reload();
        }, 100);
      }
    })
  }


  onSubmitCreate() {
    this.submitted = true;
    if (this.contacto.invalid) {
      return;
    }

    const record = {};
    record['descripcion'] = this.contacto.get('descripcion').value;
    record['cantidad'] = this.contacto.get('cantidad').value;
    record['precio_ven'] = this.contacto.get('precio_venta').value;
    record['codigo'] = this.contacto.get('codigo').value;
    record['UnidadMedida'] = 'UNIDAD';
    record['precio_com'] = '123';
    record['cod_item'] = 'ABARROTE';
    record['utilidad'] = '123';
    record['utilidad_total'] = '123';
    record['stock_critico'] = '10'
    record['Distribuidor'] = 'USUARIO NUEVO';

    this._productos.saveProducto(record).subscribe(resp => {
      if (resp) {
        // this.contacto.reset();
        this.beepService.beep();
        setTimeout(() => {
          this.Crear = true;
        this.Editar = false;
        this.submitted = false;
        window.location.reload();
        }, 100);
      }
    });
  }

  // "quagga": "^0.12.1",

  openSnackBar() {
    this._snackBar.openFromComponent(AppComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }


  SelectOperation(item: any) {

    this.Crear = true;
    this.Editar = false;

    this.contacto = this.formBuilder.group({
      codigo: ['', Validators.required],
      descripcion: ['', Validators.required],
      cantidad: ['', [Validators.required]],
      precio_venta: ['', Validators.required],
    });


    setTimeout(() => {
      this.trgFocusEl.nativeElement.focus();
    }, 100);

    // }
  }

  async GetData(code: any) {
    const result = await this._productos.getById(Number(code)).toPromise();
    if (result.length > 0) {
      // this.firstNameField.nativeElement.focus();
      // const now = new Date().getTime();
      this.addArticle(result[0], null);
      // this.lastScannedCode = code;
      // this.lastScannedCodeDate = now;
      this.beepService.beep();
      this.changeDetectorRef.detectChanges();
      // this.read = false;
      this.actualCode = code;
    }
  }

  regresar(){
    this.contacto.reset();
    this.contacto = this.formBuilder.group({

      codigo: ['', Validators.required],
      descripcion: ['', Validators.required],
      cantidad: ['', [Validators.required]],
      precio_venta: ['', Validators.required],

    });

    this.Crear = true;
    this.Editar = false;

    setTimeout(() => {
      this.trgFocusEl.nativeElement.focus();
    }, 100);



  }

}
