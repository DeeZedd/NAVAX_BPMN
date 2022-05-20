import BaseRenderer from 'diagram-js/lib/draw/BaseRenderer';

import {
  append as svgAppend,
  attr as svgAttr,
  create as svgCreate,
  remove as svgRemove
} from 'tiny-svg';

import {
  getRoundRectPath
} from 'bpmn-js/lib/draw/BpmnRenderUtil';

import { is } from 'bpmn-js/lib/util/ModelUtil';
import { isAny } from 'bpmn-js/lib/features/modeling/util/ModelingUtil';

const HIGH_PRIORITY = 1500,
      TASK_BORDER_RADIUS = 2;


export default class CustomRenderer extends BaseRenderer {
    constructor(eventBus, bpmnRenderer) {
        super(eventBus, HIGH_PRIORITY);

        this.bpmnRenderer = bpmnRenderer;
    }

    canRender(element) {
        // only render nx:elements
        return isAny(element, [ 'nx:Status', 'nx:Activity', 'nx:Decision', 'nx:Start', 'nx:Check', 'nx:Connector', 'nx:Discarded', 'nx:Declined', 'nx:Closed']) && !element.labelTarget;
    }

    drawShape(parentNode, element) {
        const shape = this.bpmnRenderer.drawShape(parentNode, element);

        // if (is(element, ))
    }

    // TO BE CONTINUTED
}