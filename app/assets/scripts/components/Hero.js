import Module from './Module';
import Slider from '../utils/Slider';

export default class Hero extends Module {
  constructor (element) {
    super(element);
    
    this.slider = null;

    this._initialize();
  }

  _initialize () {
    this._setupHandlers();

    const sliderEl = this.element.querySelector('[data-slider]'); 

    this.slider = new Slider({
      track: sliderEl,
      distance: 3,
      callback: () => {}
    });
  }

  _setupHandlers () {}
}
