import { TextFieldEntry, isTextFieldEntryEdited, ToggleSwitchEntry, isToggleSwitchEntryEdited } from '@bpmn-io/properties-panel';
import { useService } from 'bpmn-js-properties-panel';
import { is } from 'bpmn-js/lib/util/ModelUtil';

export default function(element) {
  return [
    {
      id: 'Code',
      component: CodeProperty,
      isEdited: isTextFieldEntryEdited
    }
  ];



    if (is(element, 'nx:Status')) {
        return [
            CreateCodeAttribute(element)
            // CreateBoolAttribute('Editable'),
            // CreateTextAttribute('Modification Method Code')
        ];
    }

    return [];
}

function CreateCodeAttribute(element)
{
    console.log('Creating code attribute');
    return {
        id: 'Code',
        element,
        component: CodeProperty,
        isEdited: isTextFieldEntryEdited
    };
}

function CodeProperty(props) {
  const { element, id } = props;

  const modeling = useService('modeling');
  const translate = useService('translate');
  const debounce = useService('debounceInput');

  console.log('id', id);
  console.log('modeling', modeling);
  console.log('element', element);

  const getValue = () => {
    return element.businessObject.Code || 'empty';
  }

  const setValue = value => {
    return modeling.updateProperties(element, {
      code: value
    });
  }

  return <TextFieldEntry
    id={ id }
    element={ element }
    description={ translate('Transaction Code') }
    label={ translate('Code') }
    getValue={ getValue }
    setValue={ setValue }
    debounce={ debounce }
  />
}