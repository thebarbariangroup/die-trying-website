import BaseClass from '../utils/BaseClass';

export default class Module extends BaseClass {
  
  constructor(element) {
    super();
    if (!element || !(element instanceof HTMLElement)) throw new Error(`Must pass a DOM element to ${ this.constructor.name }`);
    this.element = element;
    this._mqs = [];
  }

  _initialize () {
    console.log('MODULE abstract initialize');
  }

  _setupHandlers () {
    this.onMediaQuery = this.onMediaQuery.bind(this);
    this._checkMqs = this._checkMqs.bind(this);
    this.resizeHelper.add(this._checkMqs);
  }

  _createMediaQuery (bp, cb) {
    let mqList;
    try {
      mqList = window.matchMedia(bp);
    } catch (e) {
      console.error(`Could not make a media query from provided media string: ${ bp }`);
      throw new Error(e);
    }

    this._mqs.push({
      mq: mqList,
      callback: cb
    });
  }

  onMediaQuery (bp, cb) {
    this._createMediaQuery(bp, cb);
  }

  _checkMqs () {
    this._mqs.forEach(({mq, callback}) => {
      if (mq.matches) callback();
    });
  }
};