import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';
import test from 'node:test';

const root = fileURLToPath(new URL('../', import.meta.url));
const read = name => readFileSync(path.join(root, name), 'utf8');

test('as páginas e folhas de estilo referenciam recursos locais existentes', () => {
  for (const name of ['index.html', 'planos.html', 'privacidade.html',
    'site/styles/css-compilado/style.css', 'site/styles/cursor-music-animations.css']) {
    const content = read(name);
    const refs = [...content.matchAll(/(?:src|href)="([^"]+)"|url\(["']?([^\)"']+)/g)];
    for (const match of refs) {
      const ref = match[1] ?? match[2];
      if (/^(?:https?:|mailto:|tel:|data:|#)/.test(ref)) continue;
      const target = path.resolve(root, path.dirname(name), ref.split('#')[0]);
      assert.ok(existsSync(target), `${name}: recurso ausente ${ref}`);
    }
    for (const [, anchor] of content.matchAll(/href="#([^"]+)"/g)) {
      assert.ok(content.includes(`id="${anchor}"`), `${name}: âncora ausente ${anchor}`);
    }
  }
});

test('os inicializadores das imagens e da digitação permanecem isolados', () => {
  const callbacks = [];
  const sandbox = vm.createContext({ window: { addEventListener: (event, callback) => {
    if (event === 'load') callbacks.push(callback);
  } } });
  for (const script of ['mensagem.js', 'imagem.js']) {
    vm.runInContext(read(`site/scripts/${script}`), sandbox);
  }
  assert.equal(callbacks.length, 2);
  assert.deepEqual(callbacks.map(callback => callback.name), ['initMessageAnimation', 'initImageAnimation']);
  assert.equal('animateOnScroll' in sandbox, false);
});

test('download em planos oferece cadastro real e os metadados usam o host configurado', () => {
  const plans = read('planos.html');
  assert.match(plans, /href="https:\/\/docs.google.com\/forms\/[^\"]+"[^>]*class="cta-button"/);
  assert.ok(!plans.includes('Roadmap 2025'));
  for (const file of ['index.html', 'planos.html', 'privacidade.html']) {
    assert.match(read(file), /rel="canonical" href="https:\/\/outz-site-oficial.vercel.app\//);
    assert.ok(!read(file).includes('https://outz.com'));
  }
});
