export function getDataFormatada(data) {
  const dia = String(data.getDate()).padStart(2, '0');
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  return `${dia}/${mes}/${data.getFullYear()}`;
}

export function getDataMenosDias(data, dias) {
  return new Date(data.getFullYear(), data.getMonth(), data.getDate() - dias);
}
