# MetasSemestre

Atividade 02 — Estado, Eventos, Componentização e Persistência (Programação para Dispositivos Móveis, IESB, prof. Marcelo Alves Farias). Desenvolvido na pasta `pratica05`.

App de metas acadêmicas: cadastra, conclui e remove metas de estudo, com os dados persistidos localmente via `AsyncStorage` (sobrevivem ao fechar o app).

## Como rodar

```
npm install
npx expo start
```

Escaneia o QR code com o app Expo Go (Android/iOS) ou aperta `w` pra abrir no navegador.

## Estrutura

```
App.js                  estado principal, efeitos de persistência, handlers de add/remover/concluir
components/MetaInput.js campo de texto + botão de adicionar
components/MetaList.js  lista rolável (FlatList) + item com concluir/excluir
assets/icon.png         imagem do cabeçalho
```

## Onde estão os `useEffect` de carga e salvamento

Os dois estão em `App.js`, logo abaixo da declaração dos estados:

- **Carga** (linhas ~22-36): roda uma única vez, na montagem (`useEffect(..., [])`). Lê a chave `@metas_semestre` do `AsyncStorage`, faz `JSON.parse` e popula o estado `metas` — só isso já resolve o requisito de persistência entre aberturas do app.
- **Salvamento** (linhas ~40-51): roda toda vez que `metas` muda (`useEffect(..., [metas])`). Faz `JSON.stringify` e grava no `AsyncStorage`.

Um detalhe que evita um bug comum: os dois efeitos rodam na montagem do componente, mas o de carga é assíncrono (`await AsyncStorage.getItem(...)`). Sem cuidado, o efeito de salvamento dispararia primeiro com `metas` ainda vazio e sobrescreveria os dados salvos com `[]` antes da carga terminar. Por isso existe `carregouRef` (um `useRef`): o efeito de salvamento só grava depois que a carga inicial confirmou ter terminado (`carregouRef.current = true` no `finally` do efeito de carga).

## Desafio implementado

- Cada meta tem `concluida: boolean`. Tocar no texto da meta (em `MetaList.js`) alterna esse campo — texto risca (`textDecorationLine: 'line-through'`) quando concluída.
- Contador no cabeçalho (`App.js`) mostra "X pendentes / Y concluídas" em tempo real, calculado a partir do array `metas`.

## Prints

*(adicionar aqui: lista vazia, lista com itens, e a tela após fechar e reabrir o app — pra comprovar a persistência)*

1. Lista vazia — `screenshots/01-vazio.png`
2. Lista com itens (alguns concluídos) — `screenshots/02-com-itens.png`
3. App reaberto, dados ainda lá — `screenshots/03-persistencia.png`

## Link do Pull Request

*(adicionar aqui o link do PR)*
