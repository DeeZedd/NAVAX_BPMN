import inherits from 'inherits';

import OrderingProvider from 'diagram-js/lib/features/ordering/OrderingProvider';


/**
 * a simple ordering provider that ensures that custom
 * connections are always rendered on top.
 */
export default function nxOrderingProvider(eventBus, canvas) {

  OrderingProvider.call(this, eventBus);

  this.getOrdering = function(element, newParent) {

    if (element.type === 'nx:connection') {

      // always move to end of root element
      // to display always on top
      return {
        parent: canvas.getRootElement(),
        index: -1
      };
    }
  };
}

nxOrderingProvider.$inject = [ 'eventBus', 'canvas' ];

inherits(nxOrderingProvider, OrderingProvider);

function isNavax(element) {
  return element && /^nx:/.test(element.type);
}