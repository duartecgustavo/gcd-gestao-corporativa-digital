import { Button, Drawer, Form, Input, Space } from "antd";
import { useCallback, useEffect, useMemo } from "react";
import { formatarData } from "../../../utils/datas.util";
import CampoCNPJ from "./campoCnpj";
import CamposDataModificacao from "./camposDataModificacao";
import type { IEmpresaDrawer } from "./drawer.interfaces";
import { VALIDATION_RULES } from "./validações";
import {
  formatarCNPJ,
  removerMascaraCNPJ,
} from "../../../utils/documentos.util";
import { message } from "antd/lib";

const LARGURA_DRAWER = "60%";
const LAYOUT_FORMULARIO = "vertical";

const EmpresaDrawer: React.FC<IEmpresaDrawer> = ({
  visible,
  onClose,
  onSubmit,
  isReadOnly,
  editingEmpresa,
}) => {
  const [formulario] = Form.useForm();

  const prepararDadosFormulario = useCallback(
    (empresa: typeof editingEmpresa) => {
      if (!empresa) return {};

      return {
        ...empresa,
        cnpj: formatarCNPJ(empresa.cnpj.toString()),
        criadoEm: empresa.criadoEm ? formatarData(empresa.criadoEm) : "",
        alteradoEm: empresa.alteradoEm ? formatarData(empresa.alteradoEm) : "",
      };
    },
    []
  );

  const resetarFormulario = useCallback(() => {
    formulario.resetFields();
    formulario.setFieldsValue({ cnpj: "" });
  }, [formulario]);

  useEffect(() => {
    if (!visible) return;

    if (editingEmpresa) {
      const dadosFormatados = prepararDadosFormulario(editingEmpresa);
      formulario.setFieldsValue(dadosFormatados);
    } else {
      resetarFormulario();
    }
  }, [
    editingEmpresa,
    formulario,
    visible,
    prepararDadosFormulario,
    resetarFormulario,
  ]);

  const estaEditando = useMemo(() => Boolean(editingEmpresa), [editingEmpresa]);

  const lidarComSubmissao = useCallback(async () => {
    try {
      const valores = await formulario.validateFields();

      const cnpjProcessado = estaEditando
        ? editingEmpresa!.cnpj
        : removerMascaraCNPJ(valores.cnpj);

      const payload = {
        ...valores,
        cnpj: cnpjProcessado,
      };

      delete payload.criadoEm;
      delete payload.alteradoEm;

      console.log("Payload sendo enviado:", payload);
      await onSubmit(payload);

      message.success(
        estaEditando
          ? "Empresa atualizada com sucesso!"
          : "Empresa criada com sucesso!"
      );
    } catch (erro) {
      console.error("Erro ao validar formulário:", erro);
    }
  }, [formulario, estaEditando, editingEmpresa, onSubmit]);

  const lidarComFechamento = useCallback(() => {
    onClose();
  }, [onClose]);

  const obterTituloDrawer = () => {
    if (editingEmpresa) {
      return isReadOnly
        ? `${editingEmpresa.nomeFantasia}`
        : `Editar: ${editingEmpresa.nomeFantasia}`;
    }
    return "Adicionar Empresa";
  };

  const renderizarRodape = () => {
    if (isReadOnly) return null;

    return (
      <Space style={{ width: "100%", justifyContent: "flex-end" }}>
        <Button onClick={lidarComFechamento}>Cancelar</Button>
        <Button type="primary" onClick={lidarComSubmissao}>
          {estaEditando ? "Atualizar" : "Criar"}
        </Button>
      </Space>
    );
  };

  const obterPropriedadesCampoCNPJ = () => ({
    isReadOnly,
    editingEmpresa: editingEmpresa
      ? { cnpj: editingEmpresa.cnpj.toString() }
      : undefined,
  });

  return (
    <Drawer
      title={obterTituloDrawer()}
      placement="right"
      width={LARGURA_DRAWER}
      onClose={onClose}
      open={visible}
      styles={{
        body: { paddingBottom: 80 },
      }}
      maskClosable={true}
      footer={renderizarRodape()}
    >
      <Form form={formulario} layout={LAYOUT_FORMULARIO} disabled={isReadOnly}>
        <CampoCNPJ {...obterPropriedadesCampoCNPJ()} />

        <Form.Item name="nome" label="Nome" rules={VALIDATION_RULES.nome}>
          <Input placeholder="Digite o nome da empresa" />
        </Form.Item>

        <Form.Item
          name="nomeFantasia"
          label="Nome Fantasia"
          rules={VALIDATION_RULES.nomeFantasia}
        >
          <Input placeholder="Digite o nome fantasia" />
        </Form.Item>

        <Form.Item
          name="endereco"
          label="Endereço"
          rules={VALIDATION_RULES.endereco}
        >
          <Input.TextArea
            placeholder="Digite o endereço completo"
            rows={3}
            showCount
            maxLength={200}
          />
        </Form.Item>

        <CamposDataModificacao isReadOnly={isReadOnly} />
      </Form>
    </Drawer>
  );
};

export default EmpresaDrawer;
