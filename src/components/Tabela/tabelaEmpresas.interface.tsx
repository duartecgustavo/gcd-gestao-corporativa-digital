import type { IEmpresa } from "../../interfaces/empresa.interface";

export interface ITabelaEmpresas {
  empresas: IEmpresa[];
  loading: boolean;
  currentPage: number;
  total: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onView: (empresa: IEmpresa) => void;
  onEdit: (Iempresa: IEmpresa) => void;
  onDelete: (cnpj: number) => void;
}
