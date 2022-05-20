import { isAny } from 'bpmn-js/lib/util/ModelUtil';
import BaseRenderer from 'diagram-js/lib/draw/BaseRenderer';
import inherits from 'inherits';

export default function nxRenderer(eventBus) {
    BaseRenderer.call(this, eventBus, 1500);

    this.canRender = function(element) {
        return isAny(element, ['nx:Status', 'nx:Activity', 'nx:Decision', 'nx:Start', 'nx:Check', 'nx:Connector', 'nx:Discarded', 'nx:Declined', 'nx:Closed'])
    }
}