import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Departamento } from 'src/app/models/departamento.model';
import { Funcionario } from 'src/app/models/funcionario.model';
import { DepartamentoService } from 'src/app/services/departamento.service';
import { FuncionarioService } from 'src/app/services/funcionario.service';

@Component({
  selector: 'app-funcionario',
  templateUrl: './funcionario.component.html',
  styleUrls: ['./funcionario.component.css']
})
export class FuncionarioComponent implements OnInit {

  funcionarios$: Observable<Funcionario[]>;
  departamentos$: Observable<Departamento[]>
  departamentoFiltro: string;
  edit: boolean;
  displayDialogFuncionario: boolean;
  form: FormGroup;

  constructor( private funcionarioService: FuncionarioService, private departamentoService: DepartamentoService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.funcionarios$ = this.funcionarioService.list();
    this.departamentos$ = this.departamentoService.list();
    this.departamentoFiltro = "TODOS";
    this.configForm();
  }

  configForm() {
    this.form = this.formBuilder.group({
      id: new FormControl(),
      nome: new FormControl("", [Validators.required, Validators.minLength(3)]),
      email: new FormControl("", [Validators.required, Validators.email]),
      funcao: new FormControl(""),
      departamento: new FormControl("", Validators.required),
      foto: new FormControl()
    })
  }

  add(){
    this.form.reset();
    this.edit = false;
    this.displayDialogFuncionario = true;
  }

}
