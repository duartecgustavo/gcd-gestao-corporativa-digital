import type {
  IAtualizarEmpresa,
  IEmpresa,
} from "../interfaces/empresa.interface";

export interface AppState {
  empresas: IEmpresa[];
  loading: boolean;
  currentPage: number;
  total: number;
  error: string | null;
  operationLoading: boolean;
}

// Estados do drawer
export interface DrawerState {
  visible: boolean;
  editingEmpresa: IEmpresa | IAtualizarEmpresa | null;
  readonly: boolean;
  loading: boolean;
}
