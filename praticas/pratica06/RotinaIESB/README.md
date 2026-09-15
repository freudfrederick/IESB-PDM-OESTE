# RotinaIESB

Atividade Integradora (Aulas 02 a 06) — Programação para Dispositivos Móveis, IESB, prof. Marcelo Alves Farias. Desenvolvido na pasta `pratica06`.

Organizador simples da rotina acadêmica: o aluno cadastra compromissos do dia (aula, estudo, trabalho, lazer), visualiza a lista, remove itens e os dados persistem localmente via `AsyncStorage` (sobrevivem ao fechar o app).

## Comando usado para criar o projeto

```
npx create-expo-app@latest RotinaIESB --template blank
cd RotinaIESB
npx expo install @react-native-async-storage/async-storage react-native-safe-area-context
```

## Como rodar

```
npm install
npx expo start
```

Escaneia o QR code com o app Expo Go (Android/iOS) ou aperta `w` pra abrir no navegador.

## Estrutura

```
App.js                        estado principal, efeitos de persistência, handlers de add/remover/concluir
labels.js                     rótulos de texto do app (export nomeado)
components/CompromissoInput.js  campo de texto + botão de adicionar (linha, TextInput ~68% + botão flex)
components/CompromissoList.js   título da lista + FlatList com ListEmptyComponent + item com concluir/excluir
assets/logo.png                imagem local do cabeçalho
```

## Onde estão os `useEffect` de carga e salvamento

Os dois estão em `App.js`, logo abaixo da declaração dos estados:

- **Carga** (linhas ~23-37): roda uma única vez, na montagem (`useEffect(..., [])`). Lê a chave `@rotina_iesb_compromissos` do `AsyncStorage`, faz `JSON.parse` e popula o estado `compromissos`.
- **Salvamento** (linhas ~41-52): roda toda vez que `compromissos` muda (`useEffect(..., [compromissos])`). Faz `JSON.stringify` e grava no `AsyncStorage`.

Os dois efeitos rodam na montagem do componente, mas o de carga é assíncrono (`await AsyncStorage.getItem(...)`). Sem cuidado, o efeito de salvamento dispararia primeiro com `compromissos` ainda vazio e sobrescreveria os dados salvos com `[]` antes da carga terminar. Por isso existe `carregouRef` (um `useRef`): o efeito de salvamento só grava depois que a carga inicial confirmou ter terminado (`carregouRef.current = true` no `finally` do efeito de carga).

## Layout (Flexbox)

- Cabeçalho em `flexDirection: 'row'` (imagem + título/contador).
- Área de cadastro em `flexDirection: 'row'`: `TextInput` com `width: '68%'` e botão "Adicionar" com `flex: 1` ocupando o restante.
- Área da lista com `flex: 1`, ocupando o espaço restante da tela.
- `alignItems: 'center'` no cabeçalho e no formulário para alinhamento vertical.

## Desafios opcionais implementados (2 de 2)

- **O2 — Concluído**: cada compromisso tem `concluido: boolean`. Tocar no texto (em `CompromissoList.js`) alterna esse campo — texto risca (`textDecorationLine: 'line-through'`) quando concluído.
- **O3 — Contador**: cabeçalho mostra "X pendentes" (`App.js`), calculado a partir do array `compromissos` filtrando os não concluídos.

## Prints

1. Lista vazia — `screenshots/01-vazio.png`
2. Lista com itens (alguns concluídos) — `screenshots/02-com-itens.png`
3. App reaberto, dados ainda lá — `screenshots/03-persistencia.png`

## Link do Pull Request

*(adicionar aqui o link do PR)*
