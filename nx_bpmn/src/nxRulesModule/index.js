import RulesModule from 'diagram-js/lib/features/rules';

import nxRules from './nxRules';

export default {
  __depends__: [
    RulesModule
  ],
  __init__: [ 'nxRules' ],
  nxRules: [ 'type', nxRules ]
};
