import { Component } from '@angular/core';
import { NfseService } from '../services/nfse.service';
import { CreditoPresenter } from '../models/credit.model'
import { FormsModule } from '@angular/forms';
import { CurrencyPipe , DatePipe, CommonModule} from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { MatTableModule } from '@angular/material/table';
@Component({
  selector: 'app-consult',
  imports: [FormsModule, CommonModule, CurrencyPipe, MatTableModule, DatePipe],
  templateUrl: './consult.component.html',
  styleUrl: './consult.component.scss'
})
export class ConsultComponent {
  tipoBusca: string = 'nfse';
  valorBusca: string = '';
  resultados: CreditoPresenter[] = [];
  loading: boolean = false;
  consultaRealizada: boolean = false;
  mensagemErro: string = '';
  debounceAtivo: boolean = false;
  protected title = 'nfse-consulta';

  displayedColumns: string[] = [
  'numeroCredito',
  'numeroNfse', 
  'dataConstituicao',
  'valorIssqn',
  'tipoCredito',
  'simplesNacional',
  'aliquota',
  'valorFaturado',
  'valorDeducao',
  'baseCalculo'
];
  
  constructor(private nfseService: NfseService, private toastr: ToastrService) {
  }

  showSuccess() {
    this.toastr.success('Hello world!', 'Toastr fun!');
  }

  consultar() {
    if (!this.validarCampos() || this.debounceAtivo) {
      return;
    }

    this.ativarDebounce();
    this.iniciarConsulta();
    
    const consultaObservable = this.tipoBusca === 'nfse' 
      ? this.nfseService.consultarPorNumeroNfse(this.valorBusca)
      : this.nfseService.consultarPorNumeroCredito(this.valorBusca);

    consultaObservable.subscribe({
      next: (dados) => this.tratarSucesso(dados),
      error: (erro) => this.tratarErro(erro)
    });
  }

  private ativarDebounce(): void {
    this.debounceAtivo = true;
    setTimeout(() => {
      this.debounceAtivo = false;
    }, 500); 
  }

  private validarCampos(): boolean {
    this.mensagemErro = '';

    if (!this.valorBusca.trim()) {
      this.mensagemErro = 'Campo de busca é obrigatório';
      return false;
    }

    if (this.tipoBusca === 'nfse' && this.valorBusca.trim().length !== 7) {
      this.mensagemErro = 'Número NFSe deve ter 7 caracteres';
      return false;
    }

    if (this.tipoBusca === 'credito' && this.valorBusca.trim().length !== 6) {
      this.mensagemErro = 'Número Crédito deve ter 6 caracteres';
      return false;
    }

    return true;
  }

  private iniciarConsulta(): void {
    this.loading = true;
    this.resultados = [];
    this.consultaRealizada = false;
  }

  private tratarSucesso(dados: CreditoPresenter): void {
    this.resultados = Array.isArray(dados) ? dados : [dados];
    this.loading = false;
    this.consultaRealizada = true;
    
    console.log("Sucesso, Dados: ", dados)
    if (this.resultados.length === 0) {
      const tipo = this.tipoBusca === 'nfse' ? 'NFSe' : 'Crédito';
      this.toastr.info(`Nenhum resultado encontrado para o número ${tipo}`, 'Informação', { timeOut: 1000, closeButton: true});
    } else {
      this.toastr.success('Consulta realizada com sucesso!', 'Sucesso', { timeOut: 1000, closeButton: true});
    }
  }

  private tratarErro(erro: any): void {
    this.loading = false;
    this.consultaRealizada = true;
    
    if (erro.status === 404) {
      const tipo = this.tipoBusca === 'nfse' ? 'NFSe' : 'Crédito';
      this.toastr.error(`Número ${tipo} não encontrado`, 'Erro', { timeOut: 1000, closeButton: true});
    } else if (erro.status === 0 || erro.status >= 500) {
      this.toastr.error('Servidor está fora do ar ou desligado', 'Erro de Conexão', { timeOut: 1000, closeButton: true});
    } else {
      this.toastr.error('Erro interno do servidor', 'Erro', {timeOut: 1000, closeButton: true});
    }
  }

  limpar() {
    this.valorBusca = '';
    this.resultados = [];
    this.consultaRealizada = false;
    this.mensagemErro = '';
  }
}