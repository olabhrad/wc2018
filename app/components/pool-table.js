import Component from '@ember/component';
import { computed } from '@ember/object';
import { task } from 'ember-concurrency';
import { inject } from '@ember/service';

const STATISTICS = ['wins', 'draws', 'losses', 'goals_for', 'goals_against', 'games_played', 'goal_differential', 'points'];

export default Component.extend({
  classNames: ['card', 'o__no-padding', 'layout__box', 'o__has-rows', 'pool-table', 'u__mb__20'],
  ajax: inject(),
  matchService: inject(),

  didInsertElement() {
    this._super(...arguments);
    this.get('fetchPoolResults').perform();
  },

  fetchPoolResults: task(function * () {
    let data = yield this.get('ajax').request('https://world-cup-json.herokuapp.com/teams/results');
    let players = this.get('players');
    players.forEach(player => {
      STATISTICS.forEach(statistic => {
        player[statistic] = 0;
      });
    });
    data.forEach(teamResult => {
      let player = this.get('matchService.teamToPlayerSet')[teamResult.country];
      STATISTICS.forEach(statistic => {
        if (player) {
          player[statistic] += teamResult[statistic];
        }
      });
    });
    let sortedPlayers = players.sort((a, b) => this._comparePlayers(a, b));
    this.set('sortedPlayers', sortedPlayers);
  }),

  _comparePlayers(a, b) {
    if (a.points < b.points)
      return 1;
    if (a.points > b.points)
      return -1;

    if (a.goal_differential < b.goal_differential)
      return 1;
    if (a.goal_differential > b.goal_differential)
      return -1;

    if (a.goals_for < b.goals_for)
      return 1;
    if (a.goals_for > b.goals_for)
      return -1;

    if (a.won < b.won)
      return 1;
    if (a.won > b.won)
      return -1;

    return 0;
  }
});
