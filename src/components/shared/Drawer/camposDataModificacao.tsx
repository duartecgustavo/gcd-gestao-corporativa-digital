import React from "react";
import { Form, Input } from "antd";

interface ICamposDataModificacao{
  isReadOnly: boolean;
}

const CamposDataModificacao: React.FC<ICamposDataModificacao> = ({ isReadOnly }) => {
  if (!isReadOnly) return null;

  return (
    <>
      <Form.Item name="criadoEm" label="Cadastro em">
        <Input disabled />
      </Form.Item>
      <Form.Item name="alteradoEm" label="Última atualização">
        <Input disabled />
      </Form.Item>
    </>
  );
};

export default CamposDataModificacao;
