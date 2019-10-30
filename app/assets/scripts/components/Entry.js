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
    this.scrollArrow = this.element.querySelector('[data-scrollarrow]');
    this.facts = [].slice.call(this.element.querySelectorAll('[data-entryfact]'));
    this.timeline = this._createTimeline();
    
    const slider = this.element.querySelector('[data-slider]'); 
    this.slider = new Slider({
      track: slider,
      distance: 6,
      callback: this.animate
    });
  }

  _setupHandlers () {
    this.animate = this.animate.bind(this);
  }

  _createTimeline () {
    const className = 'dtc-hidden';
    const divisions = 8;
    const tlLength = 8;
    const timeline = new TimelineLite({ paused: true });

    const initFacts = TweenLite.to(this.facts, 0, { visibility: 'hidden', zIndex: -1 });

    const scrollArrow  = TweenLite.to(this.scrollArrow, (tlLength / 2), { y: 1000 })
    const hideAllFacts = TweenLite.set(this.element, { backgroundColor: `#1C1515` });
    
    divideAlgo(this.facts.length, divisions).reduce((acc, curr, idx) => {
      const end = (acc+curr);
      const els = this.facts.slice(acc, end);
      
      const tween = TweenLite.set(els, { visibility: 'visible', zIndex: 1 });
      console.log('RELATIVE TIME:', (tlLength / divisions) * (1/(idx+1)));
      timeline.add(tween, `+=${ (tlLength / divisions) * (1/(idx+1)) }`); // relatively add to timeline at decreasing intervals (accelerate the reveals)

      return end; // return for reduce fxn
    }, 0);
    
    timeline
      .add(scrollArrow, 0)
      .add(hideAllFacts, '+=0')
      .set({}, {}, `+=${ tlLength / divisions }`) // add a little timeline padding at the end

    return timeline;
  }

  animate (pct) {
    console.log('ANIMATE Entry', pct)
    this.timeline.progress(pct);
  }
}

function divideAlgo (num, parts) {
  const floor = Math.floor(num / parts);
  const retVal = [...new Array(parts)].map(() => floor); // basically == Array.fill(floor)
  
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