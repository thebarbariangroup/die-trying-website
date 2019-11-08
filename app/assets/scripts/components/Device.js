import Module from './Module';
import Slider from '../utils/Slider';
import { breakpoints } from '../utils/variables';

export default class Device extends Module {
  constructor (element) {
    super(element);
    // this.element = element;
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
    this.blockEls = this.element.querySelectorAll('[data-block]');
    this.spoonEl = this.element.querySelector('[data-utensil="spoon"]');
    this.forkEl = this.element.querySelector('[data-utensil="fork"]');
    this.knifeEl = this.element.querySelector('[data-utensil="knife"]');
    this.utensilEls = this.element.querySelectorAll('[data-utensil]');

    this.timeline = this._createTimeline(10);
    
    const slider = this.element.querySelector('[data-slider]'); 
    
    this.slider = new Slider({
      track: slider,
      distance: 10,
      callback: this.animate
    });

    this.onMediaQuery(`(min-width: ${ breakpoints.md }px)`, this.slider.enable.bind(this.slider));
    this.onMediaQuery(`(max-width: ${ breakpoints.md-1 }px)`, this.slider.disable.bind(this.slider));
    
    this._checkMqs(); // check initial state
  }

  _setupHandlers () {
    super._setupHandlers();
    this.animate = this.animate.bind(this);
    // this._onResize = this._onResize.bind(this);
  }

  _createTimeline (length) {
    const tlLength = length;
    const timeline = new TimelineLite({ paused: true });
    
    const changeBlocks = this._createBlocksTimeline(tlLength * 0.2);    // len :02s
    const changeScreens = this._createScreensTimeline(tlLength * 0.45); // len :04.5s
    const moveUtensils = this._createUtensilsTimeline(tlLength * 0.5);  // len :10s
    const vamp = TweenLite.set({}, {});

    timeline
      .addLabel('start', 0)
      .addLabel('screenStart', tlLength * 0.15)
      .addLabel('sceneChange', tlLength * 0.45)
      .addLabel('end', tlLength);

    timeline
      .add(moveUtensils, 'start')
      .add(changeScreens, 'screenStart')
      .add(changeBlocks, 'sceneChange')
      .add(vamp, 'end');

    return timeline;
  }

  _createBlocksTimeline (length) {
    const tlLength = length;
    const timeline = new TimelineLite();

    const initBlocks = TweenLite.set([].slice.call(this.blockEls, 1), { alpha: 0 });

    const hide = TweenLite.to([].slice.call(this.blockEls, 0, 1), tlLength * 0.25, { alpha: 0 });
    const show = TweenLite.to([].slice.call(this.blockEls, 1, 2), tlLength * 0.25, { alpha: 1 });
    const vamp = TweenLite.set({}, {});

    timeline
      .addLabel('start', 0)
      .addLabel('show', tlLength * 0.5)
      .addLabel('end', tlLength);

    timeline
      .add(hide, 'start')
      .add(show, 'show')
      .add(vamp, 'end');

    return timeline;
  }

  _createScreensTimeline (length) {
    const tlLength = length;
    const timeline = new TimelineLite();

    const initScreens = TweenLite.set([].slice.call(this.screenEls), { alpha: 0 });

    const hide = TweenLite.to([].slice.call(this.screenEls, 0, 1), (tlLength * 0.11111), { alpha: 0 });
    const shows = [].map.call(this.screenEls, screen => {
      return TweenLite.to(screen, (tlLength * 0.11111), { alpha: 1 });
    });
    // const vamp = TweenLite.set({}, {});

    timeline
      .addLabel('start', 0)
      .addLabel('hide', tlLength * 0.66667)
      .addLabel('start2', tlLength * 0.88889)
      .addLabel('end', tlLength);

    timeline
      .add(hide, 'hide')
      // .add(vamp, 'end');

    shows.forEach((show, idx) => {
      timeline.add(show, `start${ idx > 0 ? (idx + 1) : '' }`);
    });

    return timeline;
  }

  _createUtensilsTimeline (length) {
    const tlLength = length;
    const timeline = new TimelineLite({repeat: 2});

    const utensilElsArr = [].slice.call(this.utensilEls);

    const utensilTimelines = utensilElsArr.map(utensil => {
      return () => {
        const _timeline = new TimelineLite();

        const slide = TweenLite.fromTo(utensil, (tlLength / utensilElsArr.length) * 0.8, { x: '0%', y: '0%' }, { x: '-12%', y: '180%' });
        const fade = TweenLite.fromTo(utensil, (tlLength / utensilElsArr.length) * 0.2, { alpha: 1 },  { alpha: 0 });

        _timeline
          .add(slide)
          .add(fade);

        return _timeline;
      }
    });

    utensilTimelines.forEach((tl, idx) => {
      timeline.add(tl());
    });
    utensilTimelines.forEach((tl, idx) => {
      timeline.add(tl());
    });

    return timeline;
  }

  animate (pct) {
    this.timeline.progress(pct);
  }
}