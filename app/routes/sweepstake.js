import Route from '@ember/routing/route';
import aolSweepstake from 'wc2018/data/sweeps/aol';

export default Route.extend({
  model(path) {
    if (path.id === 'aol') {
      return aolSweepstake;
    }
  }
});
