export const VALIDATION_RULES = {
  required: [{ required: true, message: "Este campo é obrigatório" }],
  nome: [
    { required: true, message: "Nome é obrigatório" },
    { min: 2, message: "Nome deve ter pelo menos 2 caracteres" },
    { max: 100, message: "Nome deve ter no máximo 100 caracteres" },
  ],
  nomeFantasia: [
    { required: true, message: "Nome Fantasia é obrigatório" },
    { min: 2, message: "Nome Fantasia deve ter pelo menos 2 caracteres" },
    { max: 100, message: "Nome Fantasia deve ter no máximo 100 caracteres" },
  ],
  endereco: [
    { required: true, message: "Endereço é obrigatório" },
    { min: 10, message: "Endereço deve ter pelo menos 10 caracteres" },
    { max: 200, message: "Endereço deve ter no máximo 200 caracteres" },
  ],
};
