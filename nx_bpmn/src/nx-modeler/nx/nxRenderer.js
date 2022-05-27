import BaseRenderer from 'diagram-js/lib/draw/BaseRenderer';

import {
  append as svgAppend,
  attr as svgAttr,
  create as svgCreate,
  remove as svgRemove
} from 'tiny-svg';

import { assign } from 'min-dash';

import { getBusinessObject, is } from 'bpmn-js/lib/util/ModelUtil';
import { isAny } from 'bpmn-js/lib/features/modeling/util/ModelingUtil';

const HIGH_PRIORITY = 1500,
      TASK_BORDER_RADIUS = 2;
    
export default class nxRenderer extends BaseRenderer {
  constructor(eventBus, bpmnRenderer) {
    super(eventBus, HIGH_PRIORITY);

    this.bpmnRenderer = bpmnRenderer;
  }

  canRender(element) {
        return isAny(element, ['nx:Status', 'nx:Activity', 'nx:Decision', 'nx:Start', 'nx:Check', 'nx:Connector', 'nx:Discarded', 'nx:Declined', 'nx:Closed'])
    }

  drawShape(parentNode, element) {
    if (is(element, 'nx:Status')) {
        return drawStatus(parentNode, element.width, element.height, TASK_BORDER_RADIUS);
    }
  }

  getShapePath(shape) {
    return this.bpmnRenderer.getShapePath(shape);
  }
}

nxRenderer.$inject = [ 'eventBus', 'bpmnRenderer' ];

// helpers //////////

function drawStatus(parentGfx, width, height, r, offset) {
    let sub = width/6;
    let lastSub = sub * 5;

    var points = [
        // left box
        { x: 0, y: 0 }, { x: sub, y: 0 }, { x: sub, y: height }, { x: 0, y: height },
        // center box
        { x: 0, y: 0 }, { x: lastSub, y: 0 }, { x: lastSub, y: height }, { x: sub, y: height },
        // right box
        { x: sub, y: 0 }, { x: width, y: 0 }, { x: width, y: height }, { x: 0, y: height}
    ];
    
    var pointsString = points.map(function(point) {
        return point.x + ',' + point.y;
    }).join(' ');

    var attrs = {
      stroke: 'black',
      strokeWidth: 2,
      fill: 'white'
    };

    var polygon = svgCreate('polygon');
    svgAttr(polygon, {
        points: pointsString
    });
    svgAttr(polygon, attrs);

    svgAppend(parentGfx, polygon);

    return polygon;
}