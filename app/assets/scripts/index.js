import favicon from './utils/favicon';

import TweenLite from './lib/TweenLite.min';
import TimelineLite from './lib/TimelineLite.min';
import CSSPlugin from './lib/plugins/CSSPlugin.min';

import Entry from './components/Entry';
import Hero from './components/Hero';
import Device from './components/Device';
import Visual from './components/Visual';

const start = () => {
  favicon();

  const entryEl = document.querySelector('[data-module="entry"]');
  const heroEl = document.querySelector('[data-module="hero"]');
  const deviceEl = document.querySelector('[data-module="device"]');
  const visualEl = document.querySelector('[data-module="visual"]');

  const entry = entryEl ? new Entry(entryEl) : null;
  const hero = heroEl ? new Hero(heroEl) : null;
  const device = entryEl ? new Device(deviceEl) : null;
  const visual = entryEl ? new Visual(visualEl) : null;
}

start();