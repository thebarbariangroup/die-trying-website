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
    this._setDimensions();

    requestAnimationFrame(() => {
      this._setBounds();
      this._checkStatus()
    });
  }

  _setup () {
    this._setDimensions = this._setDimensions.bind(this);
    this._setBounds = this._setBounds.bind(this);
    this._checkStatus = this._checkStatus.bind(this);
    const _onResize = this._getBounds.bind(this, true); // force new calc
    
    this.progress = this.progress.bind(this);

    this.scrollId = this.scrollHelper.add(this._checkStatus);
    this.resizeId = this.resizeHelper.add(_onResize);
  }

  _setDimensions () {
    this.track.style.height = `${ this.distance * 100 }vh`;
    // requestAnimationFrame(() => (this._getBounds(true)));
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

  progress (percentage) {
    this._callback(percentage);
  }
}