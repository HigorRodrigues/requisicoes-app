import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Funcionario } from 'src/app/models/funcionario.model';
import { Movimentacao, Requisicao } from 'src/app/models/requisicao.model';
import { RequisicaoService } from 'src/app/services/requisicao.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-movimentacao',
  templateUrl: './movimentacao.component.html',
  styleUrls: ['./movimentacao.component.css']
})
export class MovimentacaoComponent implements OnInit {

  @Input() funcionarioLogado: Funcionario;
  requisicoes$: Observable<Requisicao[]>;
  movimentacoes: Movimentacao[];
  requisicaoSelecionada: Requisicao;
  edit: boolean;
  displayDialogMovimentacao: boolean;
  displayDialogMovimentacoes: boolean;
  form: FormGroup;
  listaStatus: string[];

  constructor( private requisicaoService: RequisicaoService, private fb: FormBuilder ) { }

  ngOnInit(): void {
    this.configForm();
    this.carregaStatus();
    this.listaRequisicoesDepartamento();
  }

  configForm(){
    this.form = this.fb.group({
      funcionario: new FormControl('', Validators.required),
      dataHora: new FormControl(''),
      status: new FormControl('', Validators.required),
      descricao: new FormControl('', Validators.required)
    })
  }

  carregaStatus(){
    this.listaStatus = ['Aberto', 'Pendente', 'Processando', 'Nãoautorizada', 'Finalizado'];
  }

  listaRequisicoesDepartamento(){
    this.requisicoes$ = this.requisicaoService.list()
      .pipe(
        map((reqs: Requisicao[]) => 
          reqs.filter(r => 
            r.destino.nome === this.funcionarioLogado.departamento.nome))
      )
  }

  setValorPadrao(){

  }

  add(requisicao: Requisicao){
    this.form.reset();
    this.edit = false;
    this.setValorPadrao();
    this.requisicaoSelecionada = requisicao;
    this.movimentacoes = (!requisicao.movimentacoes ? [] : requisicao.movimentacoes);
    this.displayDialogMovimentacao = true;
  }

  save(){
    this.movimentacoes.push(this.form.value);
    this.requisicaoSelecionada.movimentacoes = this.movimentacoes;
    this.requisicaoSelecionada.status = this.form.controls['status'].value;
    this.requisicaoSelecionada.ultimaAtualizacao = new Date();
    this.requisicaoService.createOrUpdate( this.requisicaoSelecionada ).then( () => {
      this.displayDialogMovimentacao = false;
      Swal.fire(`Requisição ${this.edit ? 'Atualizada' : 'Salva'} com sucesso.`, '', 'success')
    }).catch( (error) => {
      this.displayDialogMovimentacao = true;
      Swal.fire(`Erro ao ${this.edit ? 'Atualizar' : 'Salvar'} movimentação.`, error, 'error')
    })
    this.form.reset();
  }

  onDialogClose(event){
    this.displayDialogMovimentacoes = event;
  }

  verMovimentacoes(requisicao: Requisicao){
    this.requisicaoSelecionada = requisicao;
    this.movimentacoes = requisicao.movimentacoes;
    this.displayDialogMovimentacoes = true;
  }
}
