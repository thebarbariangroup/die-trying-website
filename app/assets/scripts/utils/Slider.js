import BaseClass from './BaseClass';

const BOUNDS = Symbol('bounds');

export default class Slider extends BaseClass {
  
  static createStatus ({
    position = 'absolute',
    top = 0,
    left = 0,
    bottom = 0,
    height = 'inherit',
    width = 'inherit'
  }) {
    const newStatus = `
      position: ${ position };
      top: ${ top };
      left: ${ left };
      bottom: ${ bottom };
    `;
    return newStatus;
  }

  constructor ({
    track,
    traveller,
    distance = 2,
    offsetTop = 1,
    callback
  }) {
    super();
    this.track = track;
    this.traveller = traveller || track.querySelector('[data-traveller]');
    this.distance = distance;
    this._disabled = false;
    this._callback = callback;
    
    this[BOUNDS] = null;

    this._initialize();
  }

  get bounds () {
    return this[BOUNDS];
  }

  set bounds (bounds) {
    this[BOUNDS] = bounds;
  }

  _initialize () {
    this._setup();
    this._setDimensions(this.distance);
    this._setBounds();

    requestAnimationFrame(() => {
      this._checkStatus()
    });
  }

  _setup () {
    const _onResize = this._getBounds.bind(this, true); // force new calc
    
    this._setDimensions = this._setDimensions.bind(this);
    this._setBounds = this._setBounds.bind(this);
    this._getBounds = this._getBounds.bind(this);
    this._checkStatus = this._checkStatus.bind(this);
    this.enable = this.enable.bind(this);
    this.disable = this.disable.bind(this);
    
    this.progress = this.progress.bind(this);

    this.scrollId = this.scrollHelper.add(this._checkStatus);
    this.resizeId = this.resizeHelper.add(_onResize);
  }

  _setDimensions (height) {
    const newHeight = Number.isNaN(parseInt(height)) 
        ? height
        : `${ parseInt(height) * 100 }vh`;
    
    console.log('NEW HEIGHT', newHeight);
    this.track.style.height = newHeight;
  }

  _setBounds () {
    const { top: trackTop, height: trackLen } = this.track.getBoundingClientRect();
    const { top, height } = this.traveller.getBoundingClientRect();
    const scrollY = window.getScrollY();

    const bounds = {
      start: (scrollY + trackTop),
      trackLen,
      top: scrollY + top,
      bottom: scrollY + (top + height),
      height,
      end: scrollY + (trackTop + trackLen)
    }
    
    this.bounds = bounds;
  }

  _getBounds (force = false) {
    if (force) this._setBounds();
    return this.bounds;
  }

  _checkStatus () {
    if (this._disabled) return;
    const { scrollY } = this.scrollHelper;
    const { start, end, trackLen, height } = this._getBounds();
    
    let styles;

    // Should slide
    if (scrollY >= start && (scrollY + height) < end) {
      styles = this.constructor.createStatus({
        position: 'fixed'
      });
      
      const pct = (scrollY - start) / (trackLen - height);
      this.progress(pct);
    }

    else if ((scrollY + height) >= end) {
      styles = this.constructor.createStatus({
        position: 'absolute',
        top: 'auto',
        bottom: '0'
      });

      this.progress(1);
    }

    else if (scrollY < start) {
      styles = this.constructor.createStatus({
        position: 'absolute',
        top: '0',
        bottom: 'auto'
      });

      this.progress(0);
    }

    return this.traveller.setAttribute('style', styles);
  }

  enable () {
    console.log('ENABLE', this)
    this._disabled = false;
    this._setDimensions(this.distance);
    this._checkStatus();
  }

  disable () {
    console.log('DISABLE', this);
    this._disabled = true;
    this._setDimensions('auto');
    this.progress(0);
    this.traveller.setAttribute('style', 'position: relative; height: auto');
  }

  progress (percentage) {
    this._callback(percentage);
  }
}