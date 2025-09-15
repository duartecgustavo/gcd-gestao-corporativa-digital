/* eslint-disable @typescript-eslint/no-empty-object-type */
export interface IEmpresa {
  id: number;
  nome: string;
  cnpj: number;
  nomeFantasia: string;
  endereco: string;
  criadoEm: string;
  alteradoEm: string;
}

export interface ICriarEmpresa {
  nome: string;
  cnpj: number;
  nomeFantasia: string;
  endereco: string;

  criadoEm?: string;
  alteradoEm?: string;
}

export interface IAtualizarEmpresa extends ICriarEmpresa {}
