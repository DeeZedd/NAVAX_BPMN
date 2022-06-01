// Import your custom property entries.
// The entry is a text input field with logic attached to create,
// update and delete the "spell" property.
import nxProps from './parts/nxProperties';

import { is } from 'bpmn-js/lib/util/ModelUtil';

const LOW_PRIORITY = 500;


/**
 * A provider with a `#getGroups(element)` method
 * that exposes groups for a diagram element.
 *
 * @param {PropertiesPanel} propertiesPanel
 * @param {Function} translate
 */
export default function nxPropertiesProvider(propertiesPanel, translate) {

  // API ////////

  /**
   * Return the groups provided for the given element.
   *
   * @param {DiagramElement} element
   *
   * @return {(Object[]) => (Object[])} groups middleware
   */
  this.getGroups = function(element) {

    /**
     * We return a middleware that modifies
     * the existing groups.
     *
     * @param {Object[]} groups
     *
     * @return {Object[]} modified groups
     */
    return function(groups) {

      console.log(groups);
      // Add the "magic" group
      if(isNavax(element)) {
        groups.push(createNavaxGroup(element, translate));
        console.log(groups);
      }
      return groups;
    }
  };


  // registration ////////

  // Register our custom magic properties provider.
  // Use a lower priority to ensure it is loaded after
  // the basic BPMN properties.
  propertiesPanel.registerProvider(LOW_PRIORITY, this);
}

nxPropertiesProvider.$inject = [ 'propertiesPanel', 'translate' ];

// Create the custom magic group
function createNavaxGroup(element, translate) {

  // create a group called "Magic properties".
  const nxGroup = {
    id: 'nx',
    label: translate('Navax properties'),
    entries: nxProps(element)
  };

  return nxGroup
}

function isNavax(element) {
    return element && /nx:/.test(element.type);
  }
  