import { Flex } from "antd";
import TelaListagemDeEmpresas from "./pages/ListagemEmpresas";

function App() {
  return (
    <Flex gap="middle" vertical style={{ padding: "24px" }}>
      <TelaListagemDeEmpresas />
    </Flex>
  );
}

export default App;
