import { PlusOutlined, ReloadOutlined } from "@ant-design/icons";
import { Button, Flex, Typography, message, Alert, Spin } from "antd";
import { useCallback, useEffect, useState, useMemo } from "react";
import EmpresaDrawer from "../components/shared/Drawer";
import TabelaEmpresas from "../components/Tabela";
import type {
  IAtualizarEmpresa,
  ICriarEmpresa,
  IEmpresa,
} from "../interfaces/empresa.interface";
import {
  atualizarEmpresa,
  buscarEmpresas,
  criarEmpresa,
  excluirEmpresa,
  visualizarEmpresa,
} from "../services/api";
import type { AppState, DrawerState } from "./ListagemEmpresas.interface";

const { Title } = Typography;

const TAMANHO_PAGINA = 10;
const MENSAGENS = {
  CRIAR_SUCESSO: "Empresa criada com sucesso!",
  ATUALIZAR_SUCESSO: "Empresa atualizada com sucesso!",
  DELETAR_SUCESSO: "Empresa deletada com sucesso!",
  CRIAR_ERRO: "Erro ao criar empresa. Tente novamente.",
  ATUALIZAR_ERRO: "Erro ao atualizar empresa. Tente novamente.",
  DELETAR_ERRO: "Erro ao deletar empresa. Tente novamente.",
  BUSCAR_ERRO: "Erro ao carregar empresas. Tente recarregar a página.",
  CARREGAR_EMPRESA_ERRO: "Erro ao carregar dados da empresa.",
};

export default function TelaListagemDeEmpresas() {
  const [estadoApp, setEstadoApp] = useState<AppState>({
    empresas: [],
    loading: false,
    currentPage: 1,
    total: 0,
    error: null,
    operationLoading: false,
  });

  const [estadoDrawer, setEstadoDrawer] = useState<DrawerState>({
    visible: false,
    editingEmpresa: null,
    readonly: false,
    loading: false,
  });

  const buscarTodasEmpresas = useCallback(async (pagina: number) => {
    setEstadoApp((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const dados = await buscarEmpresas(pagina, TAMANHO_PAGINA);

      setEstadoApp((prev) => ({
        ...prev,
        empresas: dados.data,
        total: dados.total,
        currentPage: dados.paginaAtual,
        error: null,
      }));
    } catch (erro) {
      console.error("Erro ao buscar empresas:", erro);
      setEstadoApp((prev) => ({
        ...prev,
        error: MENSAGENS.BUSCAR_ERRO,
        empresas: [],
        total: 0,
      }));
      message.error(MENSAGENS.BUSCAR_ERRO);
    } finally {
      setEstadoApp((prev) => ({ ...prev, loading: false }));
    }
  }, []);

  useEffect(() => {
    buscarTodasEmpresas(1);
  }, [buscarTodasEmpresas]);

  const abrirDrawer = useCallback(
    async (
      empresa?: IEmpresa | IAtualizarEmpresa,
      somenteVisualizacao = false
    ) => {
      setEstadoDrawer((prev) => ({
        ...prev,
        visible: true,
        readonly: somenteVisualizacao,
        loading: Boolean(empresa),
      }));

      if (empresa) {
        try {
          const empresaAtualizada = await visualizarEmpresa(empresa.cnpj);
          setEstadoDrawer((prev) => ({
            ...prev,
            editingEmpresa: empresaAtualizada,
            loading: false,
          }));
        } catch (erro) {
          console.error("Erro ao buscar empresa:", erro);
          message.error(MENSAGENS.CARREGAR_EMPRESA_ERRO);
          setEstadoDrawer((prev) => ({
            ...prev,
            loading: false,
            visible: false,
          }));
        }
      } else {
        setEstadoDrawer((prev) => ({
          ...prev,
          editingEmpresa: null,
          loading: false,
        }));
      }
    },
    []
  );

  const fecharDrawer = useCallback(() => {
    setEstadoDrawer({
      visible: false,
      editingEmpresa: null,
      readonly: false,
      loading: false,
    });
  }, []);

  const lidarComCriacao = useCallback(
    async (valores: ICriarEmpresa) => {
      setEstadoApp((prev) => ({ ...prev, operationLoading: true }));

      try {
        await criarEmpresa(valores);
        message.success(MENSAGENS.CRIAR_SUCESSO);
        fecharDrawer();
        await buscarTodasEmpresas(estadoApp.currentPage);
      } catch (erro) {
        console.error("Erro ao criar empresa:", erro);
        message.error(MENSAGENS.CRIAR_ERRO);
      } finally {
        setEstadoApp((prev) => ({ ...prev, operationLoading: false }));
      }
    },
    [estadoApp.currentPage, fecharDrawer, buscarTodasEmpresas]
  );

  const lidarComAtualizacao = useCallback(
    async (valores: IAtualizarEmpresa) => {
      setEstadoApp((prev) => ({ ...prev, operationLoading: true }));

      try {
        await atualizarEmpresa(valores.cnpj, valores);
        message.success(MENSAGENS.ATUALIZAR_SUCESSO);
        fecharDrawer();
        await buscarTodasEmpresas(estadoApp.currentPage);
      } catch (erro) {
        console.error("Erro ao atualizar empresa:", erro);
        message.error(MENSAGENS.ATUALIZAR_ERRO);
      } finally {
        setEstadoApp((prev) => ({ ...prev, operationLoading: false }));
      }
    },
    [estadoApp.currentPage, fecharDrawer, buscarTodasEmpresas]
  );

  const lidarComExclusao = useCallback(
    async (cnpj: number) => {
      setEstadoApp((prev) => ({ ...prev, operationLoading: true }));

      try {
        await excluirEmpresa(cnpj);
        message.success(MENSAGENS.DELETAR_SUCESSO);

        const novaPagina =
          estadoApp.empresas.length === 1 && estadoApp.currentPage > 1
            ? estadoApp.currentPage - 1
            : estadoApp.currentPage;

        await buscarTodasEmpresas(novaPagina);
      } catch (erro) {
        console.error("Erro ao deletar empresa:", erro);
        message.error(MENSAGENS.DELETAR_ERRO);
      } finally {
        setEstadoApp((prev) => ({ ...prev, operationLoading: false }));
      }
    },
    [estadoApp.currentPage, estadoApp.empresas.length, buscarTodasEmpresas]
  );

  const lidarComMudancaPagina = useCallback(
    (pagina: number) => {
      buscarTodasEmpresas(pagina);
    },
    [buscarTodasEmpresas]
  );

  const lidarComTentarNovamente = useCallback(() => {
    buscarTodasEmpresas(estadoApp.currentPage);
  }, [buscarTodasEmpresas, estadoApp.currentPage]);

  const estaEditando = useMemo(
    () => Boolean(estadoDrawer.editingEmpresa),
    [estadoDrawer.editingEmpresa]
  );

  const lidarComSubmissaoDrawer = useCallback(
    (valores: ICriarEmpresa | IAtualizarEmpresa) => {
      if (estaEditando) {
        return lidarComAtualizacao(valores as IAtualizarEmpresa);
      } else {
        return lidarComCriacao(valores as ICriarEmpresa);
      }
    },
    [estaEditando, lidarComAtualizacao, lidarComCriacao]
  );

  const renderizarConteudo = () => {
    if (estadoApp.error && estadoApp.empresas.length === 0) {
      return (
        <Alert
          message="Erro ao carregar dados"
          description={estadoApp.error}
          type="error"
          showIcon
          action={
            <Button
              size="small"
              onClick={lidarComTentarNovamente}
              loading={estadoApp.loading}
            >
              Tentar Novamente
            </Button>
          }
        />
      );
    }

    return (
      <TabelaEmpresas
        empresas={estadoApp.empresas}
        loading={estadoApp.loading || estadoApp.operationLoading}
        currentPage={estadoApp.currentPage}
        total={estadoApp.total}
        pageSize={TAMANHO_PAGINA}
        onPageChange={lidarComMudancaPagina}
        onView={(empresa) => abrirDrawer(empresa, true)}
        onEdit={(empresa) => abrirDrawer(empresa, false)}
        onDelete={lidarComExclusao}
      />
    );
  };

  return (
    <Spin spinning={estadoApp.operationLoading} tip="Processando...">
      <Flex gap="middle" vertical>
        <Flex justify="space-between" align="center">
          <Title level={2} style={{ margin: 0 }}>
            GCS - Gestão Corporativa Simples
          </Title>
          <Button
            icon={<ReloadOutlined />}
            onClick={() => lidarComTentarNovamente()}
            loading={estadoApp.loading}
            disabled={estadoApp.operationLoading}
          >
            Atualizar
          </Button>
        </Flex>

        <Button
          type="primary"
          icon={<PlusOutlined />}
          size="large"
          onClick={() => abrirDrawer()}
          disabled={estadoApp.operationLoading}
          style={{ alignSelf: "flex-start" }}
        >
          Adicionar Empresa
        </Button>

        {renderizarConteudo()}

        <EmpresaDrawer
          visible={estadoDrawer.visible}
          onClose={fecharDrawer}
          onSubmit={lidarComSubmissaoDrawer}
          isReadOnly={estadoDrawer.readonly}
          editingEmpresa={estadoDrawer.editingEmpresa}
        />
      </Flex>
    </Spin>
  );
}
