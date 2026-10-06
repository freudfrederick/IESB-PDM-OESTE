import { createContext, useState } from 'react';
import { getDataMenosDias } from '../util/data';

const hoje = new Date();

const DESPESAS_INICIAIS = [
  { id: 'e1', descricao: 'Supermercado', valor: 89.9, data: getDataMenosDias(hoje, 1), categoria: 'Alimentação' },
  { id: 'e2', descricao: 'Combustível', valor: 120, data: getDataMenosDias(hoje, 3), categoria: 'Transporte' },
  { id: 'e3', descricao: 'Cinema', valor: 45.5, data: getDataMenosDias(hoje, 5), categoria: 'Lazer' },
  { id: 'e4', descricao: 'Conta de luz', valor: 210.35, data: getDataMenosDias(hoje, 12), categoria: 'Contas' },
  { id: 'e5', descricao: 'Restaurante', valor: 62, data: getDataMenosDias(hoje, 20), categoria: 'Alimentação' },
];

export const DespesasContext = createContext({
  despesas: [],
  addDespesa: () => {},
  updateDespesa: () => {},
});

function DespesasContextProvider({ children }) {
  const [despesas, setDespesas] = useState(DESPESAS_INICIAIS);

  function addDespesa(dados) {
    setDespesas((atuais) => [{ ...dados, id: Date.now().toString() }, ...atuais]);
  }

  function updateDespesa(id, dados) {
    setDespesas((atuais) => atuais.map((d) => (d.id === id ? { ...d, ...dados } : d)));
  }

  return (
    <DespesasContext.Provider value={{ despesas, addDespesa, updateDespesa }}>
      {children}
    </DespesasContext.Provider>
  );
}

export default DespesasContextProvider;
