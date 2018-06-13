/* eslint-env node */
'use strict';

module.exports = function() {
  let ENV = {
    build: {},
    rootURL: '/wc2018/',
    locationType: 'hash',
    ghpages: {
      gitRemoteUrl: 'git@github.com:/olabhrad/wc2018',
    }
  };
  return ENV;
};
