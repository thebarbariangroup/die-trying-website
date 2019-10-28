import Entry from './components/Entry';
import Device from './components/Device';
import Visual from './components/Visual';

const start = () => {
  
  const entry = new Entry(document.querySelector('.dtc-entry'));
  const device = new Device(document.querySelector('.dtc-device'));
  const visual = new Visual(document.querySelector('.dtc-visual'));
}

start();