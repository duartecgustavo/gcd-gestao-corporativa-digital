export const formatarCNPJ = (cnpj: string): string => {
  if (!cnpj) return "";

  const numbers = cnpj.replace(/\D/g, "");

  return numbers.replace(
    /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
    "$1.$2.$3/$4-$5"
  );
};

export const removerMascaraCNPJ = (cnpj: string): string => {
  if (!cnpj) return "";
  return cnpj.replace(/\D/g, "");
};

export const validatarCNPJ = (cnpj: string): boolean => {
  if (!cnpj) return false;

  const numbers = removerMascaraCNPJ(cnpj);

  if (numbers.length !== 14) return false;

  if (/^(\d)\1+$/.test(numbers)) return false;

  return true;
};
