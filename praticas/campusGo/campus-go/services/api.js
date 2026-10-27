// A URL base vem do arquivo .env (EXPO_PUBLIC_API_URL). Nunca escreva o endereço direto no código.
const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

async function request(path, options) {
  if (!BASE_URL) {
    throw new Error(
      'EXPO_PUBLIC_API_URL não foi definida. Copie .env.example para .env e reinicie o Expo.'
    );
  }

  let response;
  try {
    response = await fetch(`${BASE_URL}/${path}`, options);
  } catch (error) {
    // fetch só rejeita quando não há conexão ou o endereço não existe
    throw new Error('Não foi possível conectar ao servidor. Verifique a internet e o endereço da API.');
  }

  // fetch NÃO lança erro em 404/500: é preciso olhar response.ok
  if (!response.ok) {
    throw new Error(`O servidor respondeu com erro ${response.status}.`);
  }

  return response.json();
}

export const api = {
  get: (path) => request(path),
  create: (path, body) =>
    request(path, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=UTF-8' },
      body: JSON.stringify(body),
    }),
};
