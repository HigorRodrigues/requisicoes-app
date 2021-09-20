import { FilterDepartamentoPipe } from 'src/app/pipes/filter-departamento.pipe';
import { ComumModule } from './../../../modules/comum.module';
import { NgModule } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { FuncionarioRoutingModule } from './funcionario-routing.module';
import { FuncionarioComponent } from './funcionario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    FuncionarioComponent, 
    FilterDepartamentoPipe
  ],
  imports: [
    ComumModule,
    FuncionarioRoutingModule,
    NgSelectModule,
    ReactiveFormsModule,
    FormsModule,
    
  ]
})
export class FuncionarioModule { }
