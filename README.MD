
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
