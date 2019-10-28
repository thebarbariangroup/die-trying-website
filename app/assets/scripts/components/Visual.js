import Slider from '../utils/Slider';

export default class Visual {

  constructor (element) {
    this.element = element;

    this._initialize();
  }

  _initialize () {
    this._setup();
    this.animate = this.animate.bind(this);
  }

  _setup () {
    const slider = this.element.querySelector('[data-slider]'); 
    
    this.slider = new Slider({
      track: slider,
      distance: 5,
      callback: this.animate
    });
  }

  animate (pct) {
    console.log('ANIMATE Visual', pct)
  }
}