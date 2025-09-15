import { Form } from "antd";
import { MaskedInput } from "antd-mask-input";
import React from "react";
import { formatarCNPJ } from "../../../utils/documentos.util";
import type { ICampoCNPJ } from "./drawer.interfaces";

const CampoCNPJ: React.FC<ICampoCNPJ> = ({ isReadOnly, editingEmpresa }) => {
  return (
    <>
      {isReadOnly || editingEmpresa ? (
        <Form.Item label="CNPJ">
          <span>
            {editingEmpresa?.cnpj
              ? formatarCNPJ(editingEmpresa.cnpj.toString())
              : ""}
          </span>
        </Form.Item>
      ) : (
        <Form.Item
          name="cnpj"
          label="CNPJ"
          rules={[
            { required: true, message: "CNPJ é obrigatório" },
            {
              pattern: /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/,
              message: "CNPJ deve ter formato válido (00.000.000/0000-00)",
            },
          ]}
        >
          <MaskedInput
            mask="00.000.000/0000-00"
            placeholder="00.000.000/0000-00"
          />
        </Form.Item>
      )}
    </>
  );
};

export default CampoCNPJ;
