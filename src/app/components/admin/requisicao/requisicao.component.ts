import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Departamento } from 'src/app/models/departamento.model';
import { Funcionario } from 'src/app/models/funcionario.model';
import { Requisicao } from 'src/app/models/requisicao.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DepartamentoService } from 'src/app/services/departamento.service';
import { FuncionarioService } from 'src/app/services/funcionario.service';
import { RequisicaoService } from 'src/app/services/requisicao.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-requisicao',
  templateUrl: './requisicao.component.html',
  styleUrls: ['./requisicao.component.css']
})
export class RequisicaoComponent implements OnInit {

  requisicoes$: Observable<Array<Requisicao>>;
  departamentos$: Observable<Array<Departamento>>;
  edit: boolean;
  displayDialogRequisicao: boolean;
  form: FormGroup;
  funcionarioLogado: Funcionario;

  constructor(
    private requisicaoService: RequisicaoService,
    private departamentoService: DepartamentoService,
    private auth: AuthenticationService,
    private funcionarioService: FuncionarioService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.departamentos$ = this.departamentoService.list();
    this.configForm();
    this.recuperaFuncionario();
  }

  async recuperaFuncionario() {
    await this.auth.authUser()
      .subscribe(dados => {
        this.funcionarioService.getFuncionarioLogado(dados.email)
          .subscribe(funcionarios => {
            this.funcionarioLogado = funcionarios[0];
            this.requisicoes$ = this.requisicaoService.list()
              .pipe(
                map((reqs: Requisicao[]) => reqs.filter(r => r.solicitante.email === this.funcionarioLogado.email))
              )
          })

      })
  }

  configForm(){
    this.form = this.fb.group({
      id: new FormControl(),
      destino: new FormControl('', [Validators.required]),
      socitante: new FormControl(''),
      dataAbertura: new FormControl(''),
      ultimaAtualizacao: new FormControl(''),
      status: new FormControl(''),
      descricao: new FormControl('', [Validators.required])
    })
  }

  add(){
    this.form.reset();
    this.edit = false;
    this.displayDialogRequisicao = true;
    this.setValorPadrao();
  }

  setValorPadrao(){
    this.form.patchValue({
      solicitante: this.funcionarioLogado,
      status: 'aberto',
      dataAbertura: new Date(),
      ultimaAtualizacao: new Date()
    })
  }

  save(){
    this.requisicaoService.createOrUpdate(this.form.value)
      .then(()=> {
        this.displayDialogRequisicao = false;
        Swal.fire(`Requisição ${ !this.edit ? 'salva' : 'atualizada'} com sucesso`, '', 'success')
      }).catch( (erro) => {
        this.displayDialogRequisicao = false;
        Swal.fire(`Erro ao ${ !this.edit ? 'cadastrar' : 'atualizar'} requisição.`,
          `Detalhes: ${erro}`, 'error');
      })
    this.form.reset();
  }
}
