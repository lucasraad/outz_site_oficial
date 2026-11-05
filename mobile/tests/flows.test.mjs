import assert from 'node:assert/strict';
import test from 'node:test';

import { fetchHomeFeed } from '../services/home.ts';
import { fetchMusicianProfile } from '../services/musicians.ts';
import { fetchEstablishmentProfile } from '../services/establishments.ts';
import { createFavoritesStore } from '../store/favoritesStore.ts';

test('todos os cards da Home possuem perfis correspondentes', async () => {
  const feed = await fetchHomeFeed();
  await Promise.all([
    ...feed.musicians.map(async (item) => {
      const profile = await fetchMusicianProfile(item.id);
      assert.equal(profile.name, item.name);
    }),
    ...feed.matches.map(async (item) => {
      const [musician, establishment] = await Promise.all([
        fetchMusicianProfile(item.musicianId),
        fetchEstablishmentProfile(item.establishmentId),
      ]);
      assert.equal(musician.name, item.musicianName);
      assert.equal(establishment.name, item.venueName);
    }),
  ]);
});

test('IDs inexistentes não retornam perfis de outros artistas ou estabelecimentos', async () => {
  await Promise.all([
    assert.rejects(fetchMusicianProfile('inexistente'), /Artista não encontrado/),
    assert.rejects(fetchEstablishmentProfile('inexistente'), /Estabelecimento não encontrado/),
  ]);
});

test('favoritos persistem entre instâncias e podem ser removidos sem colisão de IDs', async () => {
  const saved = new Map();
  const storage = {
    getItem: async (key) => saved.get(key) ?? null,
    setItem: async (key, value) => { saved.set(key, value); },
    removeItem: async (key) => { saved.delete(key); },
  };
  const first = createFavoritesStore(storage);
  // Uma interação antes da hidratação não pode apagar o estado salvo.
  first.getState().toggleFavorite('musician:ignored');
  assert.deepEqual(first.getState().favoriteIds, []);
  await first.persist.rehydrate();
  first.setState({ hasHydrated: true });
  first.getState().toggleFavorite('musician:1');
  first.getState().toggleFavorite('establishment:1');
  const second = createFavoritesStore(storage);
  await second.persist.rehydrate();
  second.setState({ hasHydrated: true });
  assert.deepEqual(second.getState().favoriteIds, ['musician:1', 'establishment:1']);
  second.getState().toggleFavorite('musician:1');
  const third = createFavoritesStore(storage);
  await third.persist.rehydrate();
  assert.deepEqual(third.getState().favoriteIds, ['establishment:1']);
  assert.equal(third.getState().isFavorite('musician:1'), false);
  assert.equal(third.getState().isFavorite('establishment:1'), true);
  assert.deepEqual(Object.keys(JSON.parse(saved.get('outz-favorites')).state), ['favoriteIds']);
});
