import Slider from '../utils/Slider';

export default class Device {

  constructor (element) {
    this.element = element;
    this.timeline = null;
    this.deviceEl = null;
    this.screenEls = null;
    this.paragraphEls = null;
    this.forkEl = null;
    this.knifeEl = null;
    this.spoonEl = null;

    this._initialize();
  }

  _initialize () {
    this._setupHandlers();

    this.deviceEl = this.element.querySelector('[data-device]');
    this.screenEls = this.element.querySelectorAll('[data-screen]');
    this.paragraphEls = this.element.querySelectorAll('[data-paragraph]');
    this.spoonEl = this.element.querySelector('[data-utensil="spoon"]');
    this.forkEl = this.element.querySelector('[data-utensil="fork"]');
    this.knifeEl = this.element.querySelector('[data-utensil="knife"]');
    
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

  animate (pct) {
    console.log('ANIMATE Device', pct)
  }
}