import Slider from '../utils/Slider';

export default class Visual {

  constructor (element) {
    this.element = element;
    this.timeline = null;
    this.cityEl = null;
    this.trashpileEl = null;
    this.scaleEl = null;

    this.headlineEl = null;

    this._initialize();
  }

  _initialize () {
    this._setupHandlers();
    
    this.headlineEl = this.element.querySelector('[data-headline="visual"]');
    this.cityEl = this.element.querySelector('[data-visual="nyc"]');
    this.trashpileEl = this.element.querySelector('[data-visual="trashpile"]');
    this.scaleEl = this.element.querySelector('[data-visual="scale"');

    this.timeline = this._createTimeline();

    const slider = this.element.querySelector('[data-slider]'); 
    
    this.slider = new Slider({
      track: slider,
      distance: 5,
      callback: this.animate
    });
  }

  _setupHandlers () {
    this.animate = this.animate.bind(this);
  }

  _createTimeline () {
    const tlLength = 11;
    const timeline = new TimelineLite({ paused: true });

    const initHeadline = TweenLite.set(this.headlineEl, { alpha: 0 });

    const showTrash = TweenLite.to(this.trashpileEl, 1, { y: 0 });
    const growTrash = TweenLite.to(this.trashpileEl, 4.5, { scaleX: 1, scaleY: 1, ease: Power0.easeOut });
    const shrinkCity = TweenLite.to(this.cityEl, 5, { scaleX: 1, scaleY: 1, stroke: '#FFF', ease: Linear.easeIn });
    const showHeadline = TweenLite.to(this.headlineEl, 1, { alpha: 1 });
    const showScale = this._createScaleTimeline(); // nested timeline
    const vamp = TweenLite.set({}, {});

    timeline
      .addLabel('start', 0)
      .addLabel('trash', 0.5)
      .addLabel('scale', 2)
      .addLabel('headline', 7)
      .addLabel('end', tlLength);

    timeline
      .add(shrinkCity, 'start')
      .add(showTrash, 'trash')
      .add(growTrash, 'trash')
      .add(showScale, 'scale')
      .add(showHeadline, 'headline')
      .add(vamp, 'end');

    return timeline;
  }

  _createScaleTimeline () {
    const tlLength = 4;
    const fadeLength = (tlLength * 0.2)
    const timeline = new TimelineLite();

    const scaleMaskEl = this.scaleEl.querySelector('[data-visual="yAxisMask"]');
    const scaleMarkers = this.scaleEl.querySelectorAll('[data-visual^="marker"]');

    const initScale = TweenLite.set(scaleMaskEl, { strokeDashoffset: -(scaleMaskEl.getTotalLength() || scaleMaskEl.pathLength) });
    const initMarkers = TweenLite.set(scaleMarkers, { alpha: 0 });

    const showScale = TweenLite.to(scaleMaskEl, tlLength, { strokeDashoffset: 0 });

    timeline
      .addLabel('start', 0)
      .addLabel('marker0', (tlLength * 0.17) - (fadeLength / 2))
      .addLabel('marker1', (tlLength * 0.5) - (fadeLength / 2))
      .addLabel('marker2', (tlLength * 1) - (fadeLength / 2))

    timeline
      .add(showScale, 'start');
    
    [].slice.call(scaleMarkers).forEach((marker, idx) => {
      const twn = TweenLite.to(marker, fadeLength, { alpha: 1 });
      const position = marker.getAttribute('data-visual'); // attr should be "marker#"
      timeline.add(twn, `${ position }`);
    });

    return timeline;
  }

  animate (pct) {
    this.timeline.progress(pct);
  }
}