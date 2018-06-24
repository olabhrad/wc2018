import Route from '@ember/routing/route';
import { inject } from '@ember/service';
import aolSweepstake from 'wc2018/data/sweeps/aol';
import ladsSweepstake from 'wc2018/data/sweeps/lads';

export default Route.extend({
  matchService: inject(),

  model(path) {
    if (path.id === 'aol') {
      return aolSweepstake;
    }
    else
    {
    	return ladsSweepstake;
    }
  },

  afterModel(model) {
    this.get('matchService').start(model);
  }
});
