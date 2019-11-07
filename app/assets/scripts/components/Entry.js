import { colors } from '../utils/variables';
import { partitionElementsIntoGroups } from '../utils/helpers';
import Module from './Module';
import Slider from '../utils/Slider';

export default class Entry {

  constructor (element) {
    if (!element || !(element instanceof HTMLElement)) throw new Error(`Must pass a DOM element to ${ this.constructor.name }`);
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
      distance: 8,
      callback: this.animate
    });
  }

  _setupHandlers () {
    this.animate = this.animate.bind(this);
  }

  _createTimeline () {
    const className = 'dtc-hidden';
    const divisions = 12;
    const tlLength = 6;
    const scrollArrowLen = (tlLength / 5);
    const timeline = new TimelineLite({ paused: true });

    const initFacts = TweenLite.to(this.facts, 0, { visibility: 'hidden', zIndex: -1 });

    const scrollArrow  = TweenLite.to(this.scrollArrow, scrollArrowLen, { y: 1000 })
    const hideAllFacts = TweenLite.set(this.element, { backgroundColor: `${ colors.black }` });
    
    partitionElementsIntoGroups(this.facts.length, divisions).reduce((acc, curr, idx) => {
      const end = (acc+curr);
      const els = this.facts.slice(acc, end);
      
      const tween = TweenLite.set(els, { visibility: 'visible', zIndex: 1 });
      
      const tlPos = (idx === 0)
        ? `-=${ scrollArrowLen / 2 }`
        : ((tlLength / divisions) * (1/(idx+1))).toFixed(6);

      timeline.add(tween, `+=${ tlPos }`); // relatively add to timeline at decreasing intervals (accelerate the reveals)

      return end; // return acc
    }, 0);
    
    timeline
      .add(scrollArrow, 0)
      .add(hideAllFacts, '+=0') // add to end (after the reveals)
      .set({}, {}, `-=${ tlLength / divisions }`) // add a little timeline padding at the end

    return timeline;
  }

  animate (pct) {
    this.timeline.progress(pct);
  }
}