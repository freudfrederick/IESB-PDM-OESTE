import { useContext } from 'react';
import { DespesasContext } from '../store/despesas-context';
import DespesaSaida from '../components/despesa/DespesaSaida';
import { getDataMenosDias } from '../util/data';

function DespesasRecentes() {
  const { despesas } = useContext(DespesasContext);
  const limite = getDataMenosDias(new Date(), 7);
  const recentes = despesas.filter((despesa) => despesa.data >= limite);

  return <DespesaSaida despesas={recentes} periodo="Últimos 7 dias" />;
}

export default DespesasRecentes;
