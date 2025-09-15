import axios from "axios";

import { AxiosError } from "axios";
import type {
  IAtualizarEmpresa,
  ICriarEmpresa,
} from "../interfaces/empresa.interface";
import type { IRespostaEmpresa } from "./api.interface";

const handleApiError = (error: AxiosError, defaultMessage: string) => {
  console.error(error.response?.data || error.message);
  throw new Error(
    (error.response?.data as { message?: string })?.message || defaultMessage
  );
};

const baseURL =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_API_URL_PROD
    : import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL,
  timeout: 10000,
});

export const buscarEmpresas = async (pagina: number, limite: number) => {
  const response = await api.get(`/empresas?pagina=${pagina}&limite=${limite}`);
  return response.data;
};

export const criarEmpresa = async (
  empresa: ICriarEmpresa
): Promise<IRespostaEmpresa | undefined> => {
  try {
    const response = await api.post("/empresas", empresa);
    return response.data;
  } catch (error: unknown) {
    handleApiError(
      error as AxiosError,
      "Não foi possível criar a empresa. Tente novamente."
    );
    return undefined;
  }
};

export const atualizarEmpresa = async (
  cnpj: number,
  empresa: IAtualizarEmpresa
) => {
  try {
    const response = await api.put(`/empresas/${cnpj}`, empresa);
    return response.data;
  } catch (error: unknown) {
    handleApiError(
      error as AxiosError,
      "Não foi possível atualizar a empresa. Tente novamente."
    );
  }
};

export const excluirEmpresa = async (cnpj: number) => {
  const response = await api.delete(`/empresas/${cnpj}`);
  return response.data;
};

export const visualizarEmpresa = async (cnpj: number) => {
  const response = await api.get(`/empresas/${cnpj}`);
  return response.data;
};
