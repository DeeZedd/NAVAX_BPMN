import { isAny } from 'bpmn-js/lib/util/ModelUtil';
import BaseRenderer from 'diagram-js/lib/draw/BaseRenderer';
import inherits from 'inherits';

export default function nxRenderer( config, eventBus, styles, pathMap, canvas, textRenderer, priority) {
    BaseRenderer.call(this, eventBus, 1500);

    function renderer(type) {
        return handlers[type];
      }
    
    var handlers = this.handlers = {
        'nx:Event': function(parentGfx, element, attrs) {
    
          if (!('fillOpacity' in attrs)) {
            attrs.fillOpacity = DEFAULT_FILL_OPACITY;
          }
    
          return drawCircle(parentGfx, element.width, element.height, attrs);
        }
    };

    this._renderer = renderer;
}

nxRenderer.$inject = [
    'config.bpmnRenderer',
    'eventBus',
    'styles',
    'pathMap',
    'canvas',
    'textRenderer'
];
  
  
nxRenderer.prototype.canRender = function(element) {
    return isAny(element, ['nx:Status', 'nx:Activity', 'nx:Decision', 'nx:Start', 'nx:Check', 'nx:Connector', 'nx:Discarded', 'nx:Declined', 'nx:Closed'])
};

nxRenderer.prototype.drawShape = function(parentGfx, element) {
    var type = element.type;
    var h = this._renderer(type);

    /* jshint -W040 */
    return h(parentGfx, element);
};

nxRenderer.prototype.drawConnection = function(parentGfx, element) {
    var type = element.type;
    var h = this._renderer(type);

    /* jshint -W040 */
    return h(parentGfx, element);
};