import {
    assign,
    forEach,
    bind
  } from 'min-dash';
  
  import inherits from 'inherits';
  
  import BpmnElementFactory from 'bpmn-js/lib/features/modeling/ElementFactory';
  import {
    DEFAULT_LABEL_SIZE
  } from 'bpmn-js/lib/util/LabelUtil';
  
  
  /**
   * A custom factory that knows how to create BPMN _and_ custom elements.
   */
  export default function nxElementFactory(bpmnFactory, moddle) {
    BpmnElementFactory.call(this, bpmnFactory, moddle);
  
    var self = this;
  
    /**
     * Create a diagram-js element with the given type (any of shape, connection, label).
     *
     * @param  {String} elementType
     * @param  {Object} attrs
     *
     * @return {djs.model.Base}
     */
    this.create = function(elementType, attrs) {
      var type = attrs.type;
  
      if (elementType === 'label') {
        return self.baseCreate(elementType, assign({ type: 'label' }, DEFAULT_LABEL_SIZE, attrs));
      }
  
      // add type to businessObject if custom
      if (/^nx:/.test(type)) {
        if (!attrs.businessObject) {
          attrs.businessObject = {
            type: type
          };
  
          if (attrs.id) {
            assign(attrs.businessObject, {
              id: attrs.id
            });
          }
        }
  
        // add width and height if shape
        if (!/:connection$/.test(type)) {
          assign(attrs, self._getCustomElementSize(type));
        }
  
  
        // we mimic the ModdleElement API to allow interoperability with
        // other components, i.e. the Modeler and Properties Panel
  
        if (!('$model' in attrs.businessObject)) {
          Object.defineProperty(attrs.businessObject, '$model', {
            value: moddle
          });
        }
  
        if (!('$instanceOf' in attrs.businessObject)) {
          // ensures we can use ModelUtil#is for type checks
          Object.defineProperty(attrs.businessObject, '$instanceOf', {
            value: function(type) {
              return this.type === type;
            }
          });
        }
  
        if (!('get' in attrs.businessObject)) {
          Object.defineProperty(attrs.businessObject, 'get', {
            value: function(key) {
              return this[key];
            }
          });
        }
  
        if (!('set' in attrs.businessObject)) {
          Object.defineProperty(attrs.businessObject, 'set', {
            value: function(key, value) {
              return this[key] = value;
            }
          });
        }

        // forEach(attrs, bind(function(val, key) {
        //   if (!(key in attrs.businessObject)) {
        //     Object.defineProperty(attrs.businessObject, key, {
        //       value: function(key2, value2) {
        //         return this[key2] = value2;
        //       }
        //     });
        //   }
        // }, this));
  
  
        // END minic ModdleElement API
  
        return self.baseCreate(elementType, attrs);
      }
  
      return self.createBpmnElement(elementType, attrs);
    };
  }
  
  inherits(nxElementFactory, BpmnElementFactory);
  
  nxElementFactory.$inject = [
    'bpmnFactory',
    'moddle'
  ];
  
function Base() { }

Base.prototype.get = function(name) {
  return this.$model.properties.get(this, name);
};

Base.prototype.set = function(name, value) {
  this.$model.properties.set(this, name, value);
};



  /**
   * Returns the default size of custom shapes.
   *
   * The following example shows an interface on how
   * to setup the custom shapes's dimensions.
   *
   * @example
   *
   * var shapes = {
   *   triangle: { width: 40, height: 40 },
   *   rectangle: { width: 100, height: 20 }
   * };
   *
   * return shapes[type];
   *
   *
   * @param {String} type
   *
   * @return {Dimensions} a {width, height} object representing the size of the element
   */
  nxElementFactory.prototype._getCustomElementSize = function(type) {
    var shapes = {
      __default: { width: 100, height: 80 },
      'custom:triangle': { width: 40, height: 40 },
      'custom:circle': { width: 140, height: 140 }
    };
  
    return shapes[type] || shapes.__default;
  };

  nxElementFactory.prototype.createType = function(descriptor) {

    var model = this.model;
  
    var props = this.properties,
        prototype = Object.create(Base.prototype);
  
    // initialize default values
    forEach(descriptor.properties, function(p) {
      if (!p.isMany && p.default !== undefined) {
        prototype[p.name] = p.default;
      }
    });
  
    props.defineModel(prototype, model);
    props.defineDescriptor(prototype, descriptor);
  
    var name = descriptor.ns.name;
  
    /**
     * The new type constructor
     */
    function ModdleElement(attrs) {
      props.define(this, '$type', { value: name, enumerable: true });
      props.define(this, '$attrs', { value: {} });
      props.define(this, '$parent', { writable: true });
  
      forEach(attrs, bind(function(val, key) {
        this.set(key, val);
      }, this));
    }
  
    ModdleElement.prototype = prototype;
  
    ModdleElement.hasType = prototype.$instanceOf = this.model.hasType;
  
    // static links
    props.defineModel(ModdleElement, model);
    props.defineDescriptor(ModdleElement, descriptor);
  
    return ModdleElement;
  };
  