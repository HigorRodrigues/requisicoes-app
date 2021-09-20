import { NgModule } from '@angular/core';
import { ComumModule } from 'src/app/modules/comum.module';
import { RequisicaoRoutingModule } from './requisicao-routing.module';
import { RequisicaoComponent } from './requisicao.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    RequisicaoComponent
  ],
  imports: [
    RequisicaoRoutingModule,
    ComumModule,
    NgSelectModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class RequisicaoModule { }
