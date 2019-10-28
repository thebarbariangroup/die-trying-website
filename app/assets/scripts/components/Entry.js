import Slider from '../utils/Slider';

export default class Entry {

  constructor (element) {
    this.element = element;
    this.cover = element.querySelector('[data-entrycover]');
    this.slider = null;
    this.facts = null;
    this.timeline = null;

    this._initialize();
  }

  _initialize () {
    this._setupHandlers();
    this.facts = [].slice.call(this.element.querySelectorAll('[data-entryfact]'))
    this.timeline = this._createTimeline();
    
    const slider = this.element.querySelector('[data-slider]'); 
    this.slider = new Slider({
      track: slider,
      distance: 10,
      callback: this.animate
    });
  }

  _setupHandlers () {
    this.animate = this.animate.bind(this);
  }

  _createTimeline () {
    const className = 'dtc-hidden';
    const divisions = 10;
    const timeline = new TimelineLite({ paused: true, onComplete: this._onTimelineComplete.bind(this) });
    
    divideAlgo(this.facts.length, divisions).reduce((acc, curr, idx) => {
      const end = (acc+curr);
      const els = this.facts.slice(acc, end);

      const tween = TweenLite.set(els, { className: `-=${ className }` }, 0);
      
      timeline.add(tween, `+=${ (divisions - idx) }`);
      debugger;
      return end;
    }, 0);

    const showCover = TweenLite.to(this.cover, 10, { className: `-=${ className }` });
    timeline.add(showCover, '+=0');

    return timeline;
  }

  animate (pct) {
    console.log('ANIMATE Entry', pct)
    this.timeline.progress(pct);
  }

  _onTimelineComplete () {
    // this.element.classList.remove('dtc-hidden'); // only play once
    console.log('fire something');
  }
}

function divideAlgo (num, parts) {
  const floor = Math.floor(num / parts);
  const retVal = [...new Array(parts)].map(() => floor);
  
  let diff = num - (floor * parts);
  while (diff) {
    retVal[(retVal.length-diff)] += 1;
    diff--;
  }

  for (let i = 0; i < parts; i+=2) {
    const range = [-(retVal[i]), (retVal[i])];
    const rand = getRandomInt.call(null, ...range);
    retVal[i] = retVal[i] + rand;
    retVal[i+1] = retVal[i+1] + (1-rand);
  }
  return retVal.sort((a, b) => (a - b));
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}