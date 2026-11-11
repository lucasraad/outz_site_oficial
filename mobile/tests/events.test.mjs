import assert from 'node:assert/strict';
import test from 'node:test';
import { fetchEvent, fetchEvents, EventNotFoundError } from '../services/events.ts';
import { fetchHomeFeed } from '../services/home.ts';
import { formatEventSchedule } from '../lib/eventDate.ts';

test('cada card abre o evento correto com seus participantes e estabelecimento', async () => {
  const feed = await fetchHomeFeed();
  assert.equal(feed.matches.length, 3);
  await Promise.all(feed.matches.map(async (card) => {
    const event = await fetchEvent(card.eventId);
    assert.equal(event.title, card.eventTitle);
    assert.equal(event.venue.id, card.establishmentId);
    assert.equal(event.venue.name, card.venueName);
    assert.equal(event.artists[0].id, card.musicianId);
    assert.ok(event.artists.length > 0);
    assert.ok(event.venue.address.length > 0);
    assert.deepEqual(event.artists.map((artist) => artist.id), event.musicianIds);
    assert.ok(new Date(event.endsAt) > new Date(event.startsAt));
    assert.equal(card.timeSlot, formatEventSchedule(event).timeLabel);
  }));
});

test('eventos no mesmo local mantêm identidade e artistas próprios', async () => {
  const [first, second] = await Promise.all([fetchEvent('2'), fetchEvent('3')]);
  assert.equal(first.venue.id, second.venue.id);
  assert.notEqual(first.id, second.id);
  assert.notEqual(first.startsAt, second.startsAt);
  assert.deepEqual(first.artists.map((artist) => artist.id), ['m1']);
  assert.deepEqual(second.artists.map((artist) => artist.id), ['1', 'm3']);
});

test('ID inválido nunca seleciona outro evento ou uma propriedade do objeto', async () => {
  await Promise.all(['', 'inexistente', '__proto__', 'constructor'].map((id) =>
    assert.rejects(fetchEvent(id), EventNotFoundError),
  ));
});

test('data e virada de dia respeitam o fuso do evento', async () => {
  const events = await fetchEvents();
  assert.deepEqual(formatEventSchedule(events[0]), {
    dateLabel: '20 de novembro de 2026', timeLabel: '19:30 – 23:30',
  });
  assert.deepEqual(formatEventSchedule(events[1]), {
    dateLabel: '21 de novembro de 2026', timeLabel: '20:00 – 00:30 (dia seguinte)',
  });
});
