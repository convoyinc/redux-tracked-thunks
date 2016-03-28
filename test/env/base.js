import * as chai from 'chai';
import chaiSubset from 'chai-subset';

// Make sure we have a consistent ES2015+ env.
import 'babel-polyfill';

// Clean up mocha stack traces.
import 'mocha-clean';

// # Chai

// We prefer Chai's `expect` interface.
global.expect = chai.expect;
// Give us all the info!
chai.config.truncateThreshold = 0;

// ## http://chaijs.com/plugins/chai-subset
//
// Adds object subset assertions.  TL;DR:
//
//   * expect(anObject).to.containSubset({abc: 123})
//
chai.use(chaiSubset);
