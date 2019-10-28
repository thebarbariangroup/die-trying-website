import ThrottleHelper from './ThrottleHelper';
import DebounceHelper from './DebounceHelper';

export default class BaseClass {
  
  constructor (opt) {
    this.breakpoints = {
      xs: 576,
      sm: 768,
      md: 992,
      lg: 1200
    };

    this.scrollHelper = ThrottleHelper.getInstance('scroll');
    this.resizeHelper = DebounceHelper.getInstance('resize');
  }
};