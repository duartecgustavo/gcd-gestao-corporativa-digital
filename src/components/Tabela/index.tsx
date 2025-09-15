import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Space, Table, Typography, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { IEmpresa } from "../../interfaces/empresa.interface";
import type { ITabelaEmpresas } from "./tabelaEmpresas.interface";
import { formatarData } from "../../utils/datas.util";
import { formatarCNPJ } from "../../utils/documentos.util";

const { Text } = Typography;

const TabelaEmpresas: React.FC<ITabelaEmpresas> = ({
  empresas,
  loading,
  currentPage,
  total,
  pageSize,
  onPageChange,
  onView,
  onEdit,
  onDelete,
}) => {
  const lidarComExclusao = async (cnpj: number) => {
    try {
      await onDelete(cnpj);
      message.success("Empresa deletada com sucesso!");
    } catch {
      message.error("Erro ao deletar empresa.");
    }
  };

  const renderizarAcoes = (empresa: IEmpresa) => (
    <Space>
      <Button
        icon={<EyeOutlined />}
        onClick={() => onView(empresa)}
        title="Visualizar Empresa"
      />
      <Button
        icon={<EditOutlined />}
        onClick={() => onEdit(empresa)}
        title="Editar Empresa"
      />
      <Popconfirm
        title="Tem certeza que deseja deletar esta empresa?"
        onConfirm={() => lidarComExclusao(empresa.cnpj)}
        okText="Sim"
        cancelText="Não"
      >
        <Button danger icon={<DeleteOutlined />} title="Deletar Empresa" />
      </Popconfirm>
    </Space>
  );

  const colunas: ColumnsType<IEmpresa> = [
    {
      title: "CNPJ",
      dataIndex: "cnpj",
      key: "cnpj",
      render: (cnpj) => (
        <Text copyable={{ text: cnpj.toString() }}>
          {formatarCNPJ(cnpj.toString())}
        </Text>
      ),
    },
    {
      title: "Nome Fantasia",
      dataIndex: "nomeFantasia",
      key: "nomeFantasia",
      ellipsis: true,
    },
    {
      title: "Endereço",
      dataIndex: "endereco",
      key: "endereco",
      ellipsis: true,
    },
    {
      title: "Criado Em",
      dataIndex: "criadoEm",
      key: "criadoEm",
      render: formatarData,
      sorter: (a, b) =>
        new Date(a.criadoEm).getTime() - new Date(b.criadoEm).getTime(),
      defaultSortOrder: "descend",
    },
    {
      title: "Alterado Em",
      dataIndex: "alteradoEm",
      key: "alteradoEm",
      render: formatarData,
      sorter: (a, b) => {
        const dataA = a.alteradoEm ? new Date(a.alteradoEm).getTime() : 0;
        const dataB = b.alteradoEm ? new Date(b.alteradoEm).getTime() : 0;
        return dataA - dataB;
      },
    },
    {
      title: "Ações",
      key: "acoes",
      render: (_: unknown, registro: IEmpresa) => renderizarAcoes(registro),
    },
  ];

  return (
    <Table
      rowKey="cnpj"
      columns={colunas}
      dataSource={empresas}
      loading={loading}
      pagination={{
        current: currentPage,
        pageSize: pageSize,
        total,
        onChange: onPageChange,
        showSizeChanger: false,
      }}
    />
  );
};

export default TabelaEmpresas;
