import type {
  IAtualizarEmpresa,
  ICriarEmpresa,
  IEmpresa,
} from "../../../interfaces/empresa.interface";

export interface IEmpresaDrawer {
  visible: boolean;
  onClose: () => void;
  onSubmit: (values: ICriarEmpresa) => void;
  isReadOnly: boolean;
  editingEmpresa: IAtualizarEmpresa | IEmpresa | null;
}

export interface ICampoCNPJ {
  isReadOnly: boolean;
  editingEmpresa?: { cnpj: string };
}
