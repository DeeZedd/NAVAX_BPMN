export default class nxContextPad {
    constructor (config, contextPad, create, elementFactory, injector, translate) {
        this.create = create;
        this.elementFactory = elementFactory;
        this.translate = translate;

        if (config.autoPlace !== false)
            this.autoPlace = injector.get('autoPlace', false);

        contextPad.registerProvider(this);
    }

    getContextPadEntries(element) {
        const {
            autoPlace,
            create,
            elementFactory,
            translate
        } = this;

        function appendStatus(event, element) {
            if (autoPlace) {
                const shape = elementFactory.createShape({ type: 'nx:Status' });

                autoPlace.append(element, shape);
            } else {
                appendStatusStart(event, element);
            }
        }

        function appendStatusStart(event) {
            const shape = elementFactory.createShape({ type: 'nx:Status' });
            create.start(event, shape, element);
        }

        return {
            'append.status': {
                group: 'model',
                className: 'bpmn-icon-service-task',
                title: translate('Append Status'),
                action: {
                    click: appendStatus,
                    dragstart: appendStatusStart
                }
            }
        };
    }
}

nxContextPad.$inject = [
    'config',
    'contextPad',
    'create',
    'elementFactory',
    'injector',
    'translate'
];