import inherits from 'inherits';

import ContextPadProvider from 'bpmn-js/lib/features/context-pad/ContextPadProvider';

import {
  isAny
} from 'bpmn-js/lib/features/modeling/util/ModelingUtil';

import {
  assign,
  bind
} from 'min-dash';


export default function nxContextPadProvider(injector, create, connect, elementFactory, translate) {

  injector.invoke(ContextPadProvider, this);

  var cached = bind(this.getContextPadEntries, this);

  this.getContextPadEntries = function(element) {
    var actions = cached(element);

    var businessObject = element.businessObject;

    function startConnect(event, element, autoActivate) {
      connect.start(event, element, autoActivate);
    }

    function appendStatus(event, element) {
        let autoPlace = injector.get('autoPlace', false);

        if (autoPlace) {
            const shape = elementFactory.createShape({ type: 'nx:Status' });
            console.log('appendStatus', element, shape);
            autoPlace.append(element, shape);
        } else {
            appendStatusStart(event, element);
        }
    }

    function appendStatusStart(event) {
        const shape = elementFactory.createShape({ type: 'nx:Status' });
        create.start(event, shape, element);
    }


    if (isNavaxElement(businessObject)) {
      assign(actions, {
        'append.status': {
            group: 'model',
            className: 'bpmn-icon-service-task',
            title: translate('Append Status'),
            action: {
                click: appendStatus,
                dragstart: appendStatusStart
            }
        },
        'connect': {
          group: 'connect',
          className: 'bpmn-icon-connection-multi',
          title: translate('Connect using custom connection'),
          action: {
            click: startConnect,
            dragstart: startConnect
          }
        }
      });
    }

    return actions;
  };
}

inherits(nxContextPadProvider, ContextPadProvider);

nxContextPadProvider.$inject = [
  'injector',
  'create',
  'connect',
  'elementFactory',
  'translate'
];

function isNavaxElement(element) {
    return isAny(element, ['nx:Status', 'nx:Activity', 'nx:Decision', 'nx:Start', 'nx:Check', 'nx:Connector', 'nx:Discarded', 'nx:Declined', 'nx:Closed'])
}
