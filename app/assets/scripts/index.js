import TweenLite from './lib/TweenLite.min';
import TimelineLite from './lib/TimelineLite.min';
import CSSPlugin from './lib/plugins/CSSPlugin.min';

import Entry from './components/Entry';
import Device from './components/Device';
import Visual from './components/Visual';

const start = () => {
  const entry = new Entry(document.querySelector('.dtc-entry'));
  const device = new Device(document.querySelector('[data-module="device"'));
  const visual = new Visual(document.querySelector('.dtc-visual'));
}

start();