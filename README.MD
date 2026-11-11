
Sobre o Projeto
 OUTz é um projeto de landing page focado em conectar o público, músicos e estabelecimentos em torno de eventos com música ao vivo. O objetivo principal deste repositório é demonstrar a implementação de animações e interações modernas em um projeto web estático, elevando a experiência do usuário (UX) e o apelo visual.

## Estrutura atual

- `index.html`, `planos.html` e `privacidade.html`: site institucional estático.
- `site/assets`, `site/styles` e `site/scripts`: recursos do site (fonte única).
- `mobile/`: protótipo Expo SDK 54; feed e perfis ainda usam dados simulados.
- Não há backend nem autenticação implementados neste repositório. Os botões de acesso indicam essa situação.

## Executar e validar

Use Node.js 22.18+ (os testes executam TypeScript pelo suporte nativo do Node).

```sh
# Na raiz: servir a landing em http://localhost:8000
python -m http.server 8000

# Na raiz: regressões de recursos, âncoras e scripts
node --test tests/site.test.mjs

# Aplicativo
cd mobile
npm ci
npm run typecheck
npm test
npm run web
# Gerar versão web estática
npx expo export --platform web
```

Os favoritos são locais ao dispositivo, persistidos por AsyncStorage, sem sincronização de conta.
A tela Favoritos permite abrir os perfis e remover itens salvos.
O cadastro de interesse utiliza o Google Forms já presente no site; não há download público do app neste momento.

## Endereço público

Os metadados das três páginas e o QR code usam `https://outz-site-oficial.vercel.app/`, endereço vinculado ao repositório.
Ao confirmar um domínio próprio, atualizar canonical, Open Graph, Twitter e JSON-LD nos HTML e regenerar `site/assets/qr-site.svg` com a mesma URL.
Os e-mails e contatos comerciais não são alterados por essa configuração.

## Validação das correções

- O preset Babel acompanha o SDK 54 e transforma `import.meta`, necessário ao middleware de persistência do Zustand na versão web.
- `npm run typecheck`: verificação dos contratos e componentes TypeScript.
- `npm test`: todos os cards da Home resolvem seus perfis; IDs inexistentes retornam erro; favoritos sobrevivem à recriação do estado e podem ser removidos sem colisões entre artistas e estabelecimentos.
- `node --test tests/site.test.mjs`: recursos locais, âncoras, inicializadores isolados, CTA de cadastro e metadados.
- Navegador Chromium: site em 390px e 1440px, menu com teclado/foco/Escape, âncoras, animações e movimento reduzido.
- Aplicativo web no navegador: perfis Bianca/Lua, salvar/listar favoritos, recarregar, abrir perfil e remover com persistência; acesso à conta sinalizado como indisponível.
- Imagens externas do Unsplash retornaram falha de rede no ambiente de teste; os fluxos de navegação e favoritos passaram sem erros JavaScript.
- A publicação em produção e testes em dispositivos Android/iOS reais são etapas separadas.


## Mobile — primeiro fluxo de eventos

A Home agora abre `/event/[id]`, com título, data, horários, gêneros, descrição, entrada e acesso aos perfis do local e de todos os artistas. Há estados de carregamento, evento inexistente e falha recuperável. O botão Voltar mantém o histórico; sem histórico interno, retorna à Home.

- `mobile/types/event.ts`: contratos dos eventos e dos detalhes resolvidos.
- `mobile/mocks/events.ts`: três apresentações fictícias, incluindo dois artistas e término no dia seguinte. Tubarão é somente cenário de demonstração; não define a região do lançamento.
- `mobile/services/events.ts`: consultas e resolução das relações com músicos e estabelecimentos. Fronteira a substituir por HTTP quando a API existir.
- `mobile/hooks/queries/useEvent.ts`: cache e tentativas; IDs inexistentes não geram retries.
- `mobile/lib/eventDate.ts`: datas e horários no fuso explícito do evento.
- `mobile/components/screens/event/EventDetails.tsx`: apresentação visual, separada da navegação.
- `mobile/app/event/[id].tsx`: rota, navegação e estados da consulta.

Os cards da Home são derivados desse mesmo catálogo para evitar divergência de programação. Distâncias e informações de entrada também são demonstrativas. O evento com dois artistas mantém os dois perfis acessíveis nos detalhes.

### Validar esta entrega

Na pasta `mobile`, executar `npm run typecheck`, `npm test` e `npx expo export --platform web`.
Para testar em um dispositivo, executar `npx expo start` e abrir no ambiente Expo compatível com o SDK 54. O site institucional na raiz é separado deste aplicativo; o deploy atual da landing não publica automaticamente a pasta mobile.

Aceite verificado em Chromium com toque e viewports 390×844 e 320×844: Home → cada evento → perfil de artista/local → retorno; abertura direta; ID inexistente; datas e virada de dia; sem overflow horizontal da página ou erros JavaScript. As fotos externas foram substituídas por um pixel durante a automação para não depender da rede do Unsplash. Os sete testes de dados e persistência passaram. Android/iOS físicos ainda precisam de conferência.

Busca/filtros, favoritos de eventos, autenticação e API não fazem parte desta entrega.
