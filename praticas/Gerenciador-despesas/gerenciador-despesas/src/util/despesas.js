export const CATEGORIAS = ['Alimentação', 'Transporte', 'Lazer', 'Contas'];

// Tarefa 3: devolve só as despesas da categoria escolhida.
// Sem categoria (''), devolve a lista inteira.
export function filtrarPorCategoria(despesas, categoria) {
  if (!categoria) return despesas;
  return despesas.filter((despesa) => despesa.categoria === categoria);
}
