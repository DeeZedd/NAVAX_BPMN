import {
    assign
  } from 'min-dash';
  
  
  /**
   * A palette that allows you to create BPMN _and_ custom elements.
   */
  export default function nxPaletteProvider(palette, bpmnFactory, create, elementFactory, spaceTool, lassoTool) {
  
    this._create = create;
    this._bpmnFactory = bpmnFactory;
    this._elementFactory = elementFactory;
    this._spaceTool = spaceTool;
    this._lassoTool = lassoTool;
  
    palette.registerProvider(this);
  }
  
  nxPaletteProvider.$inject = [
    'palette',
    'bpmnFactory',
    'create',
    'elementFactory',
    'spaceTool',
    'lassoTool'
  ];
  
  
  nxPaletteProvider.prototype.getPaletteEntries = function(element) {
  
    var actions  = {},
        create = this._create,
        bpmnFactory = this._bpmnFactory,
        elementFactory = this._elementFactory,
        spaceTool = this._spaceTool,
        lassoTool = this._lassoTool;
  
  
    function createAction(type, group, className, title, options) {
  
      function createListener(event) {
        var businessObject = bpmnFactory.create(type);
        var shape = elementFactory.createShape(assign({ type: type, businessObject: businessObject }, options));
        // var shape = elementFactory.createShape(assign({ type: type }, options));
        
        if (options) {
          shape.businessObject.di.isExpanded = options.isExpanded;
        }
  
        create.start(event, shape);
      }
  
      var shortType = type.replace(/^nx:/, '');
  
      return {
        group: group,
        className: className,
        title: title || 'Create ' + shortType,
        action: {
          dragstart: createListener,
          click: createListener
        }
      };
    }
  
    function createParticipant(event, collapsed) {
      create.start(event, elementFactory.createParticipantShape(collapsed));
    }
  
    assign(actions, {
      'nx-start': createAction(
        'nx:Start', 'nx', 'bpmn-icon-start-event-none', 'Create Start'
      ),
      'nx-status': createAction(
        'nx:Status', 'nx', 'bpmn-icon-task', 'Create Status'
      ),
      'custom-separator': {
        group: 'custom',
        separator: true
      },
      'lasso-tool': {
        group: 'tools',
        className: 'bpmn-icon-lasso-tool',
        title: 'Activate the lasso tool',
        action: {
          click: function(event) {
            lassoTool.activateSelection(event);
          }
        }
      },
      'space-tool': {
        group: 'tools',
        className: 'bpmn-icon-space-tool',
        title: 'Activate the create/remove space tool',
        action: {
          click: function(event) {
            spaceTool.activateSelection(event);
          }
        }
      },
      'tool-separator': {
        group: 'tools',
        separator: true
      },
      'create.start-event': createAction(
        'bpmn:StartEvent', 'event', 'bpmn-icon-start-event-none'
      ),
      // 'create.end-event': createAction(
      //   'bpmn:EndEvent', 'event', 'bpmn-icon-end-event-none'
      // ),
      'create.participant-expanded': {
        group: 'collaboration',
        className: 'bpmn-icon-participant',
        title: 'Create Pool/Participant',
        action: {
          dragstart: createParticipant,
          click: createParticipant
        }
      }
    });
  
    return actions;
  };