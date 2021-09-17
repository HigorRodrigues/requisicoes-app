import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartamentoRoutingModule } from './departamento-routing.module';
import { DepartamentoComponent } from './departamento.component';
import { ComumModule } from 'src/app/modules/comum.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [    
    DepartamentoComponent,    
  ],
  imports: [
    CommonModule,
    ComumModule,
    DepartamentoRoutingModule,
    ReactiveFormsModule,    
  ]
})
export class DepartamentoModule { }
