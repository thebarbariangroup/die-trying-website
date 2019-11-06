import TweenLite from './lib/TweenLite.min';
import TimelineLite from './lib/TimelineLite.min';
import CSSPlugin from './lib/plugins/CSSPlugin.min';

import Entry from './components/Entry';
import Device from './components/Device';
import Visual from './components/Visual';

const start = () => {
  const entryEl = document.querySelector('[data-module="entry"]');
  const deviceEl = document.querySelector('[data-module="device"]');
  const visualEl = document.querySelector('[data-module="visual"]');

  const entry = entryEl ? new Entry(entryEl) : null;
  const device = entryEl ? new Device(deviceEl) : null;
  const visual = entryEl ? new Visual(visualEl) : null;
}

start();